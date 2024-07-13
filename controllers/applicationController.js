import { cathAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from '../middlewares/error.js';

import { Application } from '../modals/applicationSchema.js';

export const employerGetAllapplications = cathAsyncError(async(req,res,next)=>{
     const { role } = req.user;
     if (role === "job Seeker") {
       return next(
         new ErrorHandler("🙅🙅Job seeker is not allowed to create job", 400)
       );
     }
     const {_id} = req.user;
     const applications = await Application.find({ "employerID.user": _id });
     res.status(200).json({
        success:true,
        applications
     })
});

export const jobseekerGetAllapplications = cathAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next(new ErrorHandler("🙅🙅Employer is not allowed to acces this resources!", 400) );
    }
    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);
export const jobseekerDeleteapplications = cathAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employer") {
      return next( new ErrorHandler( "🙅🙅Employer is not allowed to acces this resources!",   400  )
      );
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return next( new ErrorHandler( "🙅🙅 Application Not found!",404));
    }
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message:"Application Deleted Successfully!",
    });
  }
);