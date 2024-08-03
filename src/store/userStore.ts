import { toast } from "@/components/ui/use-toast";
import { CallBackendApi } from "@/lib/utils/callBackendApi";
import { create } from "zustand";

type User = {
  username?: string;
  email: string;
  password: string;
  project?: string[];
};

interface UserState {
  user: User | null;
}

export const userStore = create<UserState>(() => ({
  user: JSON.parse(localStorage.getItem("user")!)
}));

//TODO: toast message to handle any error
export const userLogin = async ({ email, password }: User) => {
  try {
    const data = await CallBackendApi({
      endpoint: "/user/login",
      body: { email, password },
    });
    if(data.success){
      localStorage.setItem("token", data?.token);
      localStorage.setItem("user", JSON.stringify(data?.user))
      console.log(data?.user);
      
      userStore.setState((state) => ({
        ...state,
        user: data.user,
      }));
      return true
    } else{
      toast({
        title: "Login error",
        description: data.message
      })
      return false
    }
  } catch (error) {
    toast({
      title: "Error",
      description: "Some internal error occured"
    })
  }
};

export const userSignup = async ({ username, email, password }: User) => {
  try {
    const data = await CallBackendApi({
      endpoint: "/user/signup",
      body: { username, email, password },
    });
    // console.log(data);
    if(data.success){
      localStorage.setItem("user", JSON.stringify(data?.user))
      localStorage.setItem("token", data?.token);
      userStore.setState((state) => ({
        ...state,
        user: data.user,
      }));
      return true
    } else{
      toast({
        title: "Signup error",
        description: "Error signing up"
      })
      return false
    }
  } catch (error) {
      toast({
        title: "Error",
        description: "Internal error occured"
      })
    
  }
};

export const userLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  userStore.setState((state) => ({
    ...state,
    user: null,
  }));
};
