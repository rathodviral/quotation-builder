export const EDIt_FORM = {
  title: 'Quotation Test',
  header: [
    {
      label: 'Quotation No',
      value: '00001',
    },
    {
      label: 'Quotation Date',
      value: '2021-02-19T09:05:37.875Z',
    },
    {
      label: 'Test',
      value: 'Test',
    },
  ],
  selfDetail: {
    country: 'India',
    name: 'Company Name',
    email: 'name@company.com',
    phone: '8888888888',
    gstin: '',
    pan: '',
    city: 'Ahemdabad',
    zipCode: '380021',
    state: 'Gujrat',
    other: [
      {
        label: 'Test',
        value: 'Test',
      },
    ],
  },
  clientDetail: {
    country: 'India',
    name: 'Company Name',
    email: 'name@company.com',
    phone: '8888888888',
    gstin: '',
    pan: '',
    city: 'Ahemdabad',
    zipCode: '380021',
    state: 'Gujrat',
    other: [
      {
        label: 'Test',
        value: 'Test',
      },
    ],
  },
  options: {
    gst: true,
    gstType: 'CGST & SGST',
    currency: 'Rupee',
    format: '00001',
    decimalPonit: 2,
  },
  billing: [
    {
      item: 'Item 1',
      test9: 'Test',
      hsn: 'HSN/SAC',
      gst: 18,
      quantity: 15,
      rate: 1095,
      cgst: 1478.25,
      sgst: 1478.25,
      amount: 19381.5,
      description: 'Test',
    },
    {
      item: 'Item 2',
      test9: 'Test',
      hsn: 'Test',
      gst: 18,
      quantity: 2,
      rate: 765,
      cgst: 137.7,
      sgst: 137.7,
      amount: 1805.4,
      description: null,
    },
  ],
  extraCharge: [
    {
      label: 'Test',
      value: 15,
    },
  ],
  termsCondtion: ['Applicable taxes will be extra.', 'Work will resume after advance payment.', 'Test'],
  billingColumnsList: [
    {
      key: 'item',
      label: 'Item',
      value: 'Item',
      type: 'text',
    },
    {
      key: 'test9',
      label: 'Test',
      type: 'text',
      value: 'Test',
    },
    {
      key: 'hsn',
      label: 'HSN/SAC',
      value: 'HSN/SAC',
      type: 'text',
    },
    {
      key: 'gst',
      label: 'GST',
      value: 18,
      type: 'number',
    },
    {
      key: 'quantity',
      label: 'Quantity',
      value: 1,
      type: 'number',
    },
    {
      key: 'rate',
      label: 'Rate',
      value: 1,
      type: 'number',
    },
    {
      key: 'cgst',
      label: 'CGST',
      value: 0.9,
      type: 'number',
    },
    {
      key: 'sgst',
      label: 'SGST',
      value: 0.9,
      type: 'number',
    },
    {
      key: 'amount',
      label: 'Amount',
      value: 1,
      type: 'number',
    },
  ],
};

export const ADD_FORM = {
  title: 'Quotation',
  header: [
    {
      label: 'Quotation No',
      value: '00001',
    },
    {
      label: 'Quotation Date',
      value: '2021-02-19T09:05:37.875Z',
    },
  ],
  selfDetail: {
    country: 'India',
    name: 'Company Name',
    email: 'name@company.com',
    phone: '8888888888',
    gstin: '',
    pan: '',
    city: 'Ahemdabad',
    zipCode: '380021',
    state: 'Gujrat',
    other: [],
  },
  clientDetail: {
    country: 'India',
    name: 'Company Name',
    email: 'name@company.com',
    phone: '8888888888',
    gstin: '',
    pan: '',
    city: 'Ahemdabad',
    zipCode: '380021',
    state: 'Gujrat',
    other: [],
  },
  options: {
    gst: false,
    gstType: null,
    currency: 'Rupee',
    format: '00001',
    decimalPonit: 2,
  },
  billing: [
    {
      item: 'Item',
      gst: 18,
      quantity: 1,
      rate: 1,
      amount: 1,
      description: '',
    },
  ],
  extraCharge: [],
  termsCondtion: ['Applicable taxes will be extra.', 'Work will resume after advance payment.'],
  billingColumnsList: [
    {
      key: 'item',
      label: 'Item',
      value: 'Item',
      type: 'text',
    },
    {
      key: 'quantity',
      label: 'Quantity',
      value: 1,
      type: 'number',
    },
    {
      key: 'rate',
      label: 'Rate',
      value: 1,
      type: 'number',
    },
    {
      key: 'amount',
      label: 'Amount',
      value: 1,
      type: 'number',
    },
  ],
};
