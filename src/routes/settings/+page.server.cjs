// NOt Loggd in = Redirect to /auth
import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export function load({ cookies }) {
    const user = cookies.get("username"); 
    if (!user) {
        throw redirect(302, "/auth");
    }
    return { user };
}
