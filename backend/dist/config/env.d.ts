export declare const env: {
    port: number;
    nodeEnv: string;
    db: {
        host: string;
        port: number;
        name: string;
        user: string;
        pass: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    mail: {
        host: string;
        port: number;
        secure: boolean;
        user: string;
        pass: string;
        from: string;
    };
    upload: {
        maxSizeMb: number;
        allowedMimeTypes: string[];
    };
};
//# sourceMappingURL=env.d.ts.map