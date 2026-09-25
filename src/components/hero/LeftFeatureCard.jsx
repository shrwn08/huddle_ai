import React from "react";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

function LeftFeatureCard() {
  return (
    <div className="w-60 h-36 rounded-md border bg-[#dbf0f6] border-[#62c6aa] p-2
  shadow-[-8px_8px_20px_-4px_#62c6aa,8px_8px_20px_-4px_#62c6aa,0px_8px_20px_-4px_#62c6aa] flex flex-col justify-center items-center gap-2">
  <div>
    <QuestionAnswerIcon sx={{fontSize : 40, color : '#0291fa'}}/>
  </div>
  <div>
    <p className="font-semibold">Pinned Context Q&A</p>
  </div>
</div>
  );
}

export default LeftFeatureCard;
