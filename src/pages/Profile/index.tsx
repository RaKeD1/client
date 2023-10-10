import React from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/hooks/redux";
import {logoutAccount} from "../../redux/reducers/AccountSlice";
import {IAccount} from "../../models/IAccount";

export const Profile: React.FC = () => {
  const user = useAppSelector(state => state.account);
  console.log('loGin',user)
  const dispatch = useAppDispatch()
  return <>
    {/*<div>{user}</div>*/}
    <button onClick={()=>dispatch(logoutAccount())}>Выход
    </button>
  </>;
};
export default Profile;
