import { NextPageContext } from 'next';
import { getSession, signOut } from 'next-auth/react'

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if(!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}

export default function Home() {
    return (
        <>
            <h1 className="text-2xl text-green-600">NetFlix Clone By Fernando</h1>
            <button className="w-full h-10 bg-white" onClick={ () => signOut() }>Logout</button>
        </>
    );
}
