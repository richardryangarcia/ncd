import React from "react";
import menuOptions from "./menuOption";

export const FlyoutContents = () => {
  return (
    <div className='text-center contents'>
      <div key='home'>
        <h1>Home</h1>
      </div>

      {Object.values(menuOptions).map((key: any, i: any) => {
        return key.map((option: any, i: number) => {
          if (option.subMenuOptions.length) {
            return (
              <div key={i}>
                <h1>{option.title}</h1>
                {option.subMenuOptions.map((subOption: any, i: number) => {
                  return <h3 key={i}>{subOption.title}</h3>;
                })}
              </div>
            );
          } else {
            return (
              <div key={i}>
                <h1>{option.title}</h1>
              </div>
            );
          }
        });
      })}
    </div>
  );
};
