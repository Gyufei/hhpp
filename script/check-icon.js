const fs = require('fs');
const path = require('path');

// 忽略的文件夹
const ignoreDirs = ['node_modules', 'public', 'script'];

// 获取所有SVG图标的名字和它们的完整路径
function getIcons() {
  const iconsDir = path.join(__dirname, '../public', 'icons');
  return fs.readdirSync(iconsDir)
    .filter(file => path.extname(file).toLowerCase() === '.svg')
    .map(file => ({
      name: path.basename(file, path.extname(file)),
      fullPath: path.join(iconsDir, file)
    }));
}

// 遍历目录，收集所有引用了图标的文件内容
function collectReferences(dir) {
  let references = '';

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      if (!ignoreDirs.includes(file)) {
        references += collectReferences(fullPath);
      }
    } else {
      try {
        // 只处理文本文件（可以根据需要调整正则表达式）
        if (/\.jsx?|\.tsx?|\.html|\.css/.test(path.extname(fullPath))) {
          references += fs.readFileSync(fullPath, 'utf8') + '\n';
        }
      } catch (err) {
        console.error(`Error reading ${fullPath}:`, err);
      }
    }
  }

  return references;
}

// 查找未使用的图标并提供删除选项
async function findAndDeleteUnusedIcons() {
  const icons = getIcons();
  const allContent = collectReferences(path.join(__dirname, '../'));
  const usedIcons = new Set();

  // 创建正则表达式来匹配图标名
  const iconRegex = new RegExp(`\\b(${icons.map(icon => icon.name).join('|')})\\b`, 'g');

  // 在所有文件内容中查找引用的图标名
  let match;
  while ((match = iconRegex.exec(allContent)) !== null) {
    usedIcons.add(match[0]);
  }

  // 找出未使用的图标
  const unusedIcons = icons.filter(icon => !usedIcons.has(icon.name));

  if (unusedIcons.length > 0) {
    console.log('未使用的图标:');
    unusedIcons.forEach(icon => console.log(`- ${icon.name}`));

    // 提示用户是否要删除未使用的图标
    const proceed = await confirmDeletion();
    if (proceed) {
      deleteUnusedIcons(unusedIcons);
    }
  } else {
    console.log('所有图标都已使用！');
  }
}

// 用户确认函数
function confirmDeletion() {
  return new Promise((resolve) => {
    const rl = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('是否要删除未使用的图标？ (y/n): ', (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y');
    });
  });
}

// 删除未使用的图标
function deleteUnusedIcons(unusedIcons) {
  unusedIcons.forEach(icon => {
    try {
      fs.unlinkSync(icon.fullPath);
      console.log(`已删除: ${icon.name}.svg`);
    } catch (err) {
      console.error(`无法删除 ${icon.name}.svg:`, err);
    }
  });
}

// 执行查找和删除
findAndDeleteUnusedIcons().catch(console.error);