export interface IFuncArgs {
    name: string;
    type: string;
    value: string | number;
}

export interface IETHqrCode {
    from?: string;
    to: string;
    value?: number;
    chainId?: number;
    functionName?: string;
    functionArgs?: IFuncArgs[];
}

export interface IExtra {
    key: string;
    value: string | number;
}

export interface IBTCqrCode {
    to: string;
    amount?: number;
    label?: string;
    message?: string;
    extra?: IExtra[];
}

export interface ISOLqrCode {
    to: string;
    amount?: number;
    label?: string;
    memo?: string;
    delegate? : string;
    authorized?: string;
    programId?: string;
    methodName?: string;
    args?: any;
    feePayer?: string;
    referral?: string;
}