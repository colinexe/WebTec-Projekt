import { useAuth } from './authContext';



const ProtectedWrapper = ({ authElement, altElement }) => {
  const { isAuthenticated } = useAuth();

 /* if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  } */
  console.log("Test")
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