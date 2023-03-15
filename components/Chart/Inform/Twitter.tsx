import React, { useEffect, useState } from "react";
import { Timeline } from "react-twitter-widgets";
import axios, { AxiosRequestConfig } from "axios";

const Twitter = () => {
  const [twitter, setTwitter] = useState<string>("BarrySilbert");

  async function getTwitter() {
    const config: AxiosRequestConfig = {
      method: "get",
      url: "https://us-central1-prime-investment-web.cloudfunctions.net/api/indicator/etc",
    };
    try {
      const etcAxios = await axios(config);
      setTwitter(etcAxios.data.twitter.slice(1));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTwitter();
  }, []);

  return (
    <Timeline
      dataSource={{ sourceType: "profile", screenName: twitter }}
      options={{ theme: "dark", width: "450", height: "390" }}
    />
  );
};

export default Twitter;
