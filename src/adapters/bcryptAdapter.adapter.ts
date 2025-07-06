import bcrypt from "bcrypt";

export const bcryptAdapter = {
    async checkPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}