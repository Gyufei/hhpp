
import { useState } from "react";

export default function TableFilter({types, filterChange}: {types: string[], filterChange: (types: string[]) => void }) {

  const [selecteds, setSelecteds] = useState<any>([])

  const handleFilterSelect = (type: string) => {
    let updateSelecteds = selecteds;
    if(selecteds.includes(type)) {
      updateSelecteds = selecteds.filter((s: any) => s!== type)
    } else {
      updateSelecteds = [...selecteds, type]
    }
    setSelecteds(updateSelecteds)
    filterChange(updateSelecteds)
  }
  if(!types) return null;

  return (
    <div className="flex items-center gap-3 py-2">
      { types.map((t, index) => {
        return (
          <button onClick={() => handleFilterSelect(t)} key={index} className="flex items-center gap-2 text-white text-xs">
            {t}
            <div
              className={`w-4 h-4 rounded border  flex items-center justify-center ${
                selecteds.includes(t)? "border-[#42E8CA]" : "border-gray-500"
              }`}
            >
                <div
                className={`w-[10px] h-[10px] rounded-sm ${
                  selecteds.includes(t)? "bg-[#42E8CA]" : "bg-black"
                }`}
                >
                </div>
            </div>
          </button>
        )})
      }
    </div>
  );
}