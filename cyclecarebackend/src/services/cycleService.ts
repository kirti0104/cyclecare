import CycleInfo from "../models/cycle";
import User from "../models/user";


const cycleInfo=async(data:any)=>{
    try{
        const user=await User.findById(data.userId);
        if(!user){
            throw new Error("User not found");
        }

        console.log("userss---")

        const cycleData=await CycleInfo.create({
            userId:user._id,
            ...data
        });

        user.isProfileComplete=true;
        await user.save();


     
        return cycleData;
    }
    catch(error){
        throw error;
    }
}

export default {
    cycleInfo
}