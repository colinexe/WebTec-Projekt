import { useAuth } from './authContext';



const ProtectedWrapper = ({ authElement, altElement }) => {
  const { isAuthenticated } = useAuth();
  console.log(authElement)
  if(isAuthenticated){
    console.log("ist authentiziert")
    return authElement;
  }else{
    console.log("ist nicht authentiziert")
    window.history.replaceState(null, "", "/");
    return altElement;
  }
};
export default ProtectedWrapper;