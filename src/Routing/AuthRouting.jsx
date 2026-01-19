import api from '../Services/axiosservice'

const SignupUser=()=>{
    return api.post("/userSignUp")
}

export default SignupUser;