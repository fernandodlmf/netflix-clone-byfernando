import useCurrentUser from "@/hooks/userCurrentUser";
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"
import { Router, useRouter } from "next/router";


export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destinantion: '/auth',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}

const Profile = () => {
    const { data: user } = useCurrentUser();
    const router = useRouter();
    return (
        <div className="flex h-full items-center justify-center">
            <div className="flex flex-col justify-center">
                <p className="text-white text-3xl md:text-6xl text-center">Profiles</p>
                <div onClick= {() => router.push('/')} className="flex flex-row items-center justify-center gap-8 mt-10">
                    <div className="group w-44 mx-auto" onClick={() => {}}>
                        <div className="
                            w-44
                            h-44
                            rouded-md
                            flex
                            items-center
                            justify-center
                            border-2
                            border-transparent
                            group-hover:cursor-pointer
                            group-hover:border-white
                            overflow-hidden
                            ">
                                <img src="/images/default-blue.png" alt="Profile"/>
                        </div>
                        <div className="
                            text-center
                            text-gray-400
                            text-2xl
                            group-hover:text-white mt-4">
                                {user?.name}
                        </div>

                    </div>
                </div>
            </div>            
        </div>
    )
}

export default Profile