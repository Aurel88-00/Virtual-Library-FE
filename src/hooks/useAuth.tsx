import { useMeQuery } from "../state/services/authApi"

interface User {
    name: string;
    email: string;
}

export function useAuth(): {
    isAuthenticated: boolean,
    user: User | null
} {

    const storedToken = localStorage.getItem("authorization");

    const { data: authenticatedUserData, isSuccess: authenticatedUserHasSuccess, isLoading: authenticatedUserLoading } = useMeQuery(storedToken as string, {
        skip: !Boolean(storedToken)
    });


    if (!storedToken) {
        return {
            isAuthenticated: false,
            user: null
        }
    }

    if (!authenticatedUserLoading) {
        return {
            isAuthenticated: authenticatedUserHasSuccess,
            user: authenticatedUserData?.user
        }
    }

    return {
        isAuthenticated: Boolean(storedToken),
        user: null
    }
}