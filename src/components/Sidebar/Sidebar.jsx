import React from "react";
import {sidebarLinks} from "../../Constants/sidebarData";
import {AiFillCloseSquare} from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import engJs from "../../Constants/en";
import spainJs from "../../Constants/es";

const Sidebar = () => {
  const {lang} = useSelector(state => state.wallet);
  const navigate = useNavigate();
  const aboutTxt =  engJs.aboutUs 
  const termsTxt =engJs.termsConds 
  const privacyTxt =   engJs.privacyPolicy 
  const revealKeyTxt = "Reveal Credentials"
  const logoutTxt = engJs.logout 
  const resetTxt = engJs.reset 
  const titles = [revealKeyTxt, logoutTxt, resetTxt];

  return (
    <div className='flex flex-col   py-6 z-10 rounded-xl bg-white'>
      <div>
        {sidebarLinks?.map((item, index) => {
          return (
            <span
              key={index}
              className=' hover:bg-hover_1 hover:text-white flex items-center gap-x-3 py-24 cursor-pointer font-semibold text-lg pl-5 pt-2 p-1  transition-all duration-400'
              onClick={() => {
                item.handler();
                navigate(item.destination);
              }}>
              <img
              className="hover:bg-white"
                src={item.logo}
                alt='Img'
              />
              {titles[index]}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
