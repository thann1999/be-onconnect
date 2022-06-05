import { Optional } from 'sequelize/types';

interface Option {
  title: string;
  description: string;
}

export interface CompareInfo {
  id: number;
  packageId: number;
  isWebsiteLiveChat: boolean;
  isChatCallLink: boolean;
  isChatCallQR: boolean;
  isWhatsApp: boolean;
  email: string;
  isLocalNumber: boolean;
  isTollFreeNumber: boolean;
  inboundOutbound: string;
  sms: boolean;
  isDynamicSMS: boolean;
}

export interface PackageInfo {
  id: number;
  title: string;
  subtitle: string;
  value: string;
  type: number;
  monthlyPricing: number;
  yearlyPricing: number;
  summary: string;
  options: Option[];
  channels: string;
}

export const initialPackage: Optional<PackageInfo, 'id'>[] = [
  {
    title: 'Essentials',
    subtitle: 'Recommended for 1 to 10 staff',
    value: '5',
    type: 0,
    monthlyPricing: 20,
    yearlyPricing: 200,
    summary: 'Engage customers across online touch points with rich and contextual experiences.',
    options: [
      {
        title: 'Connect',
        description: `Live chat & web call for sales\nMessaging across web, 
        mobile, and social\nAccess to all channels:`,
      },
      {
        title: 'Orchestrate',
        description: `Flexible routing rules\nAdvanced team structure & permissions`,
      },
      {
        title: 'Evaluate',
        description: `Live chat & web call for sales\nMessaging across web, mobile, 
          and social\nUnified omnichannel thread\nDefault email inbox`,
      },
      {
        title: 'Support',
        description: `Assigned customer success manager\n24/7 technical support`,
      },
    ],
    channels: '1,2,3,4,5',
  },
  {
    title: 'Business',
    subtitle: 'Recommended for more than 10 staff',
    monthlyPricing: 30,
    yearlyPricing: 300,
    type: 1,
    value: '8',
    summary: 'Automate workflows with AI bots and advanced routing at scale.',
    options: [
      {
        title: 'Connect',
        description: `Live chat & web call for sales\nMessaging across web, mobile, 
          and social\nUnified omnichannel thread\nDefault email inbox\nAccess to all channels:`,
      },
      {
        title: 'Orchestrate',
        description: `Basic routing rules\nBasic team structure & permissions`,
      },
      {
        title: 'Evaluate',
        description: `Basic dashboard statistics\nBasic reporting\n30-days conversations & reports
        \n1GB media storage/ licence\nPrebuilt integration\nBasic widget customisation\n
        Data security`,
      },
      {
        title: 'Support',
        description: `Assigned customer success manager\n24/7 technical support`,
      },
    ],
    channels: '1,2,3,4,5,6',
  },
  {
    title: 'Enterprise',
    subtitle: 'Recommended for more than 20 staff',
    monthlyPricing: 40,
    yearlyPricing: 400,
    value: '12',
    type: 0,
    summary: 'Unlock actionable data and analysis to accelerate your business.',
    options: [
      {
        title: 'Connect',
        description: `Live chat & web call for sales\nMessaging across web, 
          mobile, and social\nAccess to all channels:`,
      },
      {
        title: 'Connect',
        description: `Live chat & web call for sales\nMessaging across web, mobile, 
          and social\nUnified omnichannel thread\nDefault email inbox`,
      },
      {
        title: 'Evaluate',
        description: `Basic dashboard statistics\nBasic reporting\n30-days conversations & reports
        \n1GB media storage/ licence\nPrebuilt integration\nBasic widget customisation\n
        Data security`,
      },
      {
        title: 'Support',
        description: `Assigned customer success manager\n24/7 technical support`,
      },
    ],
    channels: '1,2,3,4,5,6,7',
  },
];

export const initialCompareList: Optional<CompareInfo, 'id'>[] = [
  {
    packageId: 1,
    isWebsiteLiveChat: true,
    isChatCallLink: false,
    isChatCallQR: false,
    isWhatsApp: true,
    email: '1 default team email',
    isLocalNumber: true,
    isTollFreeNumber: true,
    inboundOutbound: 'Not Usage',
    sms: true,
    isDynamicSMS: true,
  },
  {
    packageId: 2,
    isWebsiteLiveChat: true,
    isChatCallLink: true,
    isChatCallQR: true,
    isWhatsApp: true,
    email: 'Up to 10 team emails',
    isLocalNumber: true,
    isTollFreeNumber: true,
    inboundOutbound: 'Usage',
    sms: true,
    isDynamicSMS: true,
  },
  {
    packageId: 3,
    isWebsiteLiveChat: true,
    isChatCallLink: true,
    isChatCallQR: true,
    isWhatsApp: true,
    email: 'Unlimited team emails',
    isLocalNumber: true,
    isTollFreeNumber: true,
    inboundOutbound: 'Usage',
    sms: true,
    isDynamicSMS: true,
  },
];
