import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/user.model'
import { NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer';
 
connect() //DB connection

export async function POST(request : NextRequest) { 
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        
        //validation
        console.log(reqBody)

        //check if user already exist or not
        //if user is already exist
        const user = await User.findOne({email})

        if(user) {
            return NextResponse.json({error : "user already exist"},{status : 400})
        }

        //if user is new
        //hash password using bcrypt js
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        
        /*const newUser = new User({
            username,
            email,
            password : hashedPassword
        }).save()*/ //you do directlly or in this method also

        const newUser = new User({
            username,
            email,
            password : hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        //send verification email
        await sendEmail({email, emailType : "VERIFY",userId : savedUser._id})

        return NextResponse.json({message:"user registered successfully",
            success : true,
            savedUser
        })

        

    }catch(error : any) {
        return NextResponse.json({error : error.message},
            {status : 500}
        )
    }
}