import React ,{useState} from 'react'

const SelectButton = ({children, selected, onClick}) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
     setIsHover(true);
  };
  const handleMouseLeave = () => {
     setIsHover(false);
  };

  return (
    
    <span onClick={onClick} style={{ border:"1px solid gold",
    borderRadius: 5,
    padding:10,
    paddingLeft:20,
    paddingRight:20,
    fontFamily:"Montserrat",
    cursor:"pointer",
    backgroundColor:(selected || isHover)?"gold":"",
    color:(selected || isHover)?"black":"",
    fontWeight:selected?700:500,
    width:"22%",
   }
  }
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}>{children}</span>
  )
};

export default SelectButton;