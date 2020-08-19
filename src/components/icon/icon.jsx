import React from 'react'
import {IconTemp} from './IconTemp.jsx'
import Logout from './icons/Logout.svg'


const Icon = [
  { Logout },
].reduce((acc,icon)=>{
  const [e] =Object.entries(icon);
return { ...acc, [e[0]]: (props) => <IconTemp {...props} src={e[1]} /> };
},{});

export default Icon;
