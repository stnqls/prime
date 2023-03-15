import Chat from "../../../components/Chart/Chat/Chat";
import ReferralLink from "./referral/ReferralLink";
import Etc from "./etc/Etc";
import CoinSetting from "./coinSetting/CoinSetting";

import "../indicator/indicator.scss";

function Indicator() {
  return (
    <div className="indicator">
      <div className="indicator__contents">
        <ReferralLink />
        <Etc />
        <CoinSetting />
      </div>
      <Chat isAdmin={true} show={true} />
    </div>
  );
}

export default Indicator;
