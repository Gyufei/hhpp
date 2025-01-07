import HomeHeader from "./home-header";
import HomeBanner from "./home-banner";
import TradeMore from "./trade-more";
import BlockChain from "./block-chain";
import HomeBrand from "./home-brand";
import HomeFooter from "./home-footer";

export default function Home() {
  return (
    <div className="mx-0">
      <HomeHeader />
      <HomeBanner />
      <TradeMore />
      <BlockChain />
      <HomeBrand />
      <HomeFooter />
    </div>
  );
}
