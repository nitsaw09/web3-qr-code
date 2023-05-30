import * as qrcode from 'qrcode';
import { IBTCqrCode, IETHqrCode, IExtra, IFuncArgs, ISOLqrCode } from './qrcode.interface';
import BigNumber from 'bignumber.js';

export class QrCode {
    constructor() {}

    /**
     * Serializes the function arguments into a query string format.
     * @param args The ethereum contract function arguments.
     * @returns The serialized query string parameters.
     */
    private async serializeFunctionParameters(args: IFuncArgs[]) {
        const queryStringParams: string[] = [];
        for (const arg of args) {
            const { type, value } = arg;
            const queryStringParam = `${type}=${value}`;
            queryStringParams.push(queryStringParam);
        }
        return queryStringParams.join('&');
    }

    /**
     * Serializes the extra arguments into a query string format.
     * @param args The bitcoin extra arguments.
     * @returns The serialized query string parameters.
     */
    private async serializeExtraParameters(args: IExtra[]) {
        const queryStringParams: string[] = [];
        for (const arg of args) {
            const { key, value } = arg;
            const queryStringParam = `${key}:${value}`;
            queryStringParams.push(queryStringParam);
        }
        return queryStringParams.join('&');
    }

    /**
     * Generates an Ethereum QR code based on the provided parameters.
     * @param params The Ethereum QR code parameters.
     * @returns The generated QR code data URL.
     */
    async generateETHqrCode(params: IETHqrCode) {
        try {
            const { from = '', to, value = 0, chainId = 1, functionName, functionArgs = [] } = params;
            let qrData;

            // Construct the QR code data based on the provided parameters
            if (functionName) {
                const args = await this.serializeFunctionParameters(functionArgs);
                qrData = `ethereum:${to}@${chainId}/${functionName}?${args}`;
            } else {
                qrData = `ethereum:${to}@${chainId}?`;
            }

            // Add additional parameters to the QR code data if provided
            if (from) qrData += `&from=${from}`;
            if (value > 0) {
                // Convert the value to the appropriate decimal precision (18 decimal places for ETH)
                const val = (new BigNumber(value)).pow(10).toString();
                qrData += `&value=${val}`;
            }

            // Generate the QR code data URL using the qrcode library
            const result = await qrcode.toDataURL(qrData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Generates an Bitcoin QR code based on the provided parameters.
     * @param params The Bitcoin QR code parameters.
     * @returns The generated QR code data URL.
     */
    async generateBTCqrCode(params: IBTCqrCode) {
        try {
            const query: any = params;
            
            // Construct the QR code data based on the provided parameters
            let qrData = `bitcoin:${query.to}?`;
            
            // Serializes the extra arguments into a query string format.
            if (query.extra) {
                const extraArgs = await this.serializeExtraParameters(query.extra);
                qrData += `&args=${extraArgs}`;
            }

            for (const key in query) {
                if(key !== 'to' && key !== 'extra') {
                    qrData += `&${key}=${query[key]}`;
                } 
            }

            // Generate the QR code data URL using the qrcode library
            const result = await qrcode.toDataURL(qrData);
            return result;
        } catch(err) {
            throw err;
        }
    }

    /**
     * Generates an Solana QR code based on the provided parameters.
     * @param params The Solana QR code parameters.
     * @returns The generated QR code data URL.
     */
    async generateSOLqrCode(params: ISOLqrCode) {
        try {
            const query: any = params;
            
            // Construct the QR code data based on the provided parameters
            let qrData = `solana:${query.to}?`;

            // Serializes the smart contract function arguments into a base64 string format.
            if (query.programId && query.args) {
                const jsonString = JSON.stringify(query.args);
                const extraArgs = Buffer.from(jsonString).toString('base64');
                qrData += `&args=${extraArgs}`;
            }

            for (const key in query) {
                if(key !== 'to' && key !== 'args') {
                    qrData += `&${key}=${query[key]}`;
                } 
            }

            // Generate the QR code data URL using the qrcode library
            const result = await qrcode.toDataURL(qrData);
            return result;
        } catch(err) {
            throw err;
        }
    }
}
