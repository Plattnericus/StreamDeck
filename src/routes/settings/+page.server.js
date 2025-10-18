import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Load} */
export function load({ cookies }) {
    const user = cookies.get('username');
    if (user) throw redirect(302, '/auth');
    return {};
}
