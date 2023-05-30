import * as qrcode from 'qrcode';
import { QrCode } from '../src/qrcode';
import { IETHqrCode } from '../src/qrcode.interface';
import BigNumber from 'bignumber.js';

jest.mock('qrcode');
const mockQrCode = qrcode as jest.Mocked<typeof qrcode>;

describe('QrCode', () => {
  let qrCode: QrCode;

  beforeEach(() => {
    qrCode = new QrCode();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('generateETHqrCode', () => {
    it('should generate ETH QR code without function name and arguments', async () => {
      const params: IETHqrCode = {
        to: '0x1234567890abcdef1234567890abcdef12345678',
        chainId: 1,
      };
      mockQrCode.toDataURL.mockImplementationOnce(
        (): Promise<any> => Promise.resolve('mockedDataURL')
      );
      const result = await qrCode.generateETHqrCode(params);

      expect(qrcode.toDataURL).toHaveBeenCalledTimes(1);
      expect(qrcode.toDataURL).toHaveBeenCalledWith('ethereum:0x1234567890abcdef1234567890abcdef12345678@1?');
      expect(result).toBe('mockedDataURL');
    });

    it('should generate ETH QR code with function name and arguments', async () => {
      const params: IETHqrCode = {
        to: '0x1234567890abcdef1234567890abcdef12345678',
        chainId: 1,
        functionName: 'transfer',
        functionArgs: [
          { type: 'address', name: 'address', value: '0x9876543210abcdef1234567890abcdef12345678' },
          { type: 'uint256', name: 'amount', value: 1000 },
        ],
      };
      mockQrCode.toDataURL.mockImplementationOnce(
        (): Promise<any> => Promise.resolve('mockedDataURL')
      );
      const result = await qrCode.generateETHqrCode(params);

      expect(qrcode.toDataURL).toHaveBeenCalledTimes(1);
      expect(qrcode.toDataURL).toHaveBeenCalledWith(
        'ethereum:0x1234567890abcdef1234567890abcdef12345678@1/transfer?address=0x9876543210abcdef1234567890abcdef12345678&uint256=1000'
      );
      expect(result).toBe('mockedDataURL');
    });

    it('should generate ETH QR code with optional parameters', async () => {
      const params: IETHqrCode = {
        from: '0xabcdef1234567890abcdef1234567890abcdef12',
        to: '0x1234567890abcdef1234567890abcdef12345678',
        value: 100,
        chainId: 1,
        functionName: 'transfer',
        functionArgs: [
          { type: 'address', name: 'address', value: '0x9876543210abcdef1234567890abcdef12345678' },
          { type: 'uint256', name: 'amount', value: 1000 },
        ],
      };
      const ethValue = (new BigNumber(100)).pow(10).toString();
      mockQrCode.toDataURL.mockImplementationOnce(
        (): Promise<any> => Promise.resolve('mockedDataURL')
      );
      const result = await qrCode.generateETHqrCode(params);

      expect(qrcode.toDataURL).toHaveBeenCalledTimes(1);
      expect(qrcode.toDataURL).toHaveBeenCalledWith(
        `ethereum:0x1234567890abcdef1234567890abcdef12345678@1/transfer?address=0x9876543210abcdef1234567890abcdef12345678&uint256=1000&from=0xabcdef1234567890abcdef1234567890abcdef12&value=${ethValue}`
      );
      expect(result).toBe('mockedDataURL');
    });

    it('should throw an error if qrcode.toDataURL fails', async () => {
      const params: IETHqrCode = {
        to: '0x1234567890abcdef1234567890abcdef12345678'
      };
      const mockError = new Error('QR code generation failed');
      (qrcode.toDataURL as jest.Mock).mockRejectedValue(mockError);

      await expect(qrCode.generateETHqrCode(params)).rejects.toThrow(mockError);
    });
  });

  describe('generateBTCqrCode', () => {
    it('should generate a Bitcoin QR code', async () => {
      const params = {
        to: '1D9hTwC4jCnAAg5WtEe6CgwcR17qUdN9ap',
        extra: [
          { key: 'label', value: 'Test Label' },
          { key: 'amount', value: '0.001' },
        ],
        memo: 'Payment for services',
      };

      const expectedQrData = `bitcoin:${params.to}?&args=label:Test Label&amount:0.001&memo=${params.memo}`;
      const expectedDataUrl = 'mockedDataURL';

      mockQrCode.toDataURL.mockImplementationOnce(
        (): Promise<any> => Promise.resolve('mockedDataURL')
      );

      const result = await qrCode.generateBTCqrCode(params);

      expect(qrcode.toDataURL).toHaveBeenCalledWith(expectedQrData);
      expect(result).toBe(expectedDataUrl);
    });

    it('should generate a Bitcoin QR code without extra arguments', async () => {
      const params = {
        to: '1D9hTwC4jCnAAg5WtEe6CgwcR17qUdN9ap',
        memo: 'Payment for services',
      };

      const expectedQrData = `bitcoin:${params.to}?&memo=${params.memo}`;
      const expectedDataUrl = 'mockedDataURL';

      mockQrCode.toDataURL.mockImplementationOnce(
        (): Promise<any> => Promise.resolve('mockedDataURL')
      );

      const result = await qrCode.generateBTCqrCode(params);

      expect(qrcode.toDataURL).toHaveBeenCalledWith(expectedQrData);
      expect(result).toBe(expectedDataUrl);
    });

    it('should throw an error if qrcode.toDataURL fails', async () => {
      const params = {
        to: '1D9hTwC4jCnAAg5WtEe6CgwcR17qUdN9ap',
        memo: 'Payment for services',
      };
      const mockError = new Error('QR code generation failed');
      (qrcode.toDataURL as jest.Mock).mockRejectedValue(mockError);

      await expect(qrCode.generateBTCqrCode(params)).rejects.toThrow(mockError);
    });
  });

  describe('generateSOLqrCode', () => {
    it('should generate a Solana QR code', async () => {
      const params = {
        to: '7oGz5zZS5Bwzrh5zGQ1d9EzRzGXTESR6Cm9EGNsnKLvD',
        programId: 'AbCdEfGhIjKlMnOpQrStUvWxYz123456',
        methodName: 'transfer',
        args: {
          to: "3QJmV3qfvLkKg24FRg8VvCwK9Wiu3Zsi6WiCwSLP9v8j",
          amount: 100
        },
        memo: 'Payment for services',
      };
      const jsonString = JSON.stringify(params.args);
      const extraArgs = Buffer.from(jsonString).toString('base64');
      const expectedQrData = `solana:${params.to}?&args=${extraArgs}&programId=${params.programId}&methodName=${params.methodName}&memo=${params.memo}`;
      const expectedDataUrl = 'mockedDataURL';

      mockQrCode.toDataURL.mockImplementationOnce(
        (): Promise<any> => Promise.resolve('mockedDataURL')
      );

      const result = await qrCode.generateSOLqrCode(params);

      expect(qrcode.toDataURL).toHaveBeenCalledWith(expectedQrData);
      expect(result).toBe(expectedDataUrl);
    });

    it('should generate a Solana QR code without function arguments', async () => {
      const params = {
        to: '7oGz5zZS5Bwzrh5zGQ1d9EzRzGXTESR6Cm9EGNsnKLvD',
        programId: 'AbCdEfGhIjKlMnOpQrStUvWxYz123456',
        memo: 'Payment for services',
      };

      const expectedQrData = `solana:${params.to}?&programId=${params.programId}&memo=${params.memo}`;
      const expectedDataUrl = 'mockedDataURL';

      mockQrCode.toDataURL.mockImplementationOnce(
        (): Promise<any> => Promise.resolve('mockedDataURL')
      );

      const result = await qrCode.generateSOLqrCode(params);

      expect(qrcode.toDataURL).toHaveBeenCalledWith(expectedQrData);
      expect(result).toBe(expectedDataUrl);
    });

    it('should throw an error if qrcode.toDataURL fails', async () => {
      const params = {
        to: '7oGz5zZS5Bwzrh5zGQ1d9EzRzGXTESR6Cm9EGNsnKLvD',
        programId: 'AbCdEfGhIjKlMnOpQrStUvWxYz123456',
        memo: 'Payment for services',
      };
      const mockError = new Error('QR code generation failed');
      (qrcode.toDataURL as jest.Mock).mockRejectedValue(mockError);

      await expect(qrCode.generateSOLqrCode(params)).rejects.toThrow(mockError);
    });
  });
});
