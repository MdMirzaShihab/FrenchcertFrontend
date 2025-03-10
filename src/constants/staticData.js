const servicesData = [
  {
    serviceID: 1,
    serviceName: "ISO 9001",
    serviceDescription:
      "Looking at the currently available version of the standard, some of the anticipated overarching benefits are listed below. However, what we do know is that this revision to ISO 9001 is bringing the requirements up-to-date with good management practice; a lot has changed in 15 years since the last significant revision to ISO 9001.",
  },
  {
    serviceID: 2,
    serviceName: "ISO 14001",
    serviceDescription:
      "ISO 14001:2015 specifies the requirements for a management system that an organization can use to enhance its environmental performance. ISO 14001:2015 is intended for use by an organization seeking to manage its environmental responsibilities in a systematic manner that contributes to the environmental pillar of sustainability.",
  },
  {
    serviceID: 3,
    serviceName: "ISO 27001",
    serviceDescription:
      "ISO 27001 is an internationally recognized standard for information security management systems (ISMS). It provides a systematic approach to managing sensitive company information, ensuring its confidentiality, integrity, and availability. The certification outlines a framework for identifying, assessing, and managing information security risks, allowing organizations to establish policies, procedures, and controls to protect data from threats. Achieving ISO 27001 certification demonstrates an organization’s commitment to securing its information assets, enhancing its reputation, and meeting legal, regulatory, and contractual security requirements.",
  },
  {
    serviceID: 4,
    serviceName: "ISO 22000",
    serviceDescription:
      "Food Safety means adequate controls on presence of food based hazards in food at the time of its consumptions. Food safety is not single stage controls but is combined efforts of all the party participating in the food chain, this includes Feed Producers, Primary Producers through manufacturer, Transporter, Store operator, wholesalers, retailers, Caterers, Food Service Outlets and Producers of Equipments, Packaging Materials, Cleaning Agents, Additives & preservatives & Ingredients and Service providers. Even this includes Pesticides, fertilizers and veterinary drugs. Successful Implementation of FSMS helps the organisation to prevent problems like presence of Microbes, Toxins and Adulteration etc before its occurrence & Suggest Corrective action.",
  },
  {
    serviceID: 5,
    serviceName: "FSSC 22000",
    serviceDescription:
      "ISO/IEC 20000 is the international standard for IT Service Management (ITSM), providing a framework for organizations to establish, implement, maintain, and continually improve an IT service management system (SMS). It ensures effective delivery of high-quality IT services aligned with business and customer needs, incorporating best practices often aligned with ITIL (Information Technology Infrastructure Library). The standard emphasizes customer focus, continuous improvement, and efficient service delivery through processes like service level management, incident management, change management, and supplier management. By adopting ISO 20000, organizations can enhance service quality, improve operational efficiency, manage risks, and demonstrate a commitment to excellence, gaining a competitive edge through internationally recognized certification. It is applicable to organizations of all sizes and industries, offering a structured approach to managing IT services effectively.",
  },
  {
    serviceID: 6,
    serviceName: "ISO 45001",
    serviceDescription:
      "ISO/IEC 27001:2013 is the international standard for Information Security Management Systems (ISMS), providing a systematic framework for managing sensitive information and ensuring its confidentiality, integrity, and availability. It helps organizations identify, assess, and mitigate information security risks through a risk-based approach, ensuring robust protection of data assets. The standard emphasizes continuous improvement and compliance with legal, regulatory, and contractual requirements. By implementing ISO 27001, organizations can enhance their security posture, build trust with stakeholders, and demonstrate a commitment to safeguarding information. Certification to ISO 27001 is globally recognized and applicable to organizations of all sizes and sectors, offering a structured methodology to manage information security risks effectively.",
  },
  {
    serviceID: 7,
    serviceName: "ISO 50001",
    serviceDescription:
      "ISO 13485:2016 is the international standard for Quality Management Systems (QMS) specific to the medical device industry. It provides a framework for organizations to design, develop, produce, install, and service medical devices while ensuring compliance with regulatory requirements and consistently meeting customer and regulatory expectations. The standard emphasizes risk management, traceability, and continuous improvement throughout the product lifecycle. By implementing ISO 13485, organizations can enhance product quality, ensure patient safety, and facilitate regulatory approvals in global markets. Certification to ISO 13485 is widely recognized and demonstrates a commitment to maintaining high standards in the design and manufacture of medical devices, making it essential for manufacturers, suppliers, and distributors in the healthcare sector.",
  },
  {
    serviceID: 8,
    serviceName: "IATF 16949",
    serviceDescription:
      "Food  safety today is one of the most important things for food producer and for  the final consumers on the market. Consumer concern about treats associated with  food is growing and the food quality and food safety has become major issue in media and in the public in the recent years. Production and sale of food with suitable quality  is fundamental element of gaining confidence of consumers on every market. Companies which offer and sell their products on the market are changing their  behavior regarding food safety and trying to implement every standard market is International food  standard and food safety supply chain managements.",
  },
  {
    serviceID: 9,
    serviceName: "EN 9100 / EN 9120",
    serviceDescription:
      "BRC (British Retail Consortium) Global Standard for Food Safety The BRC (British Retail Consortium) Global Standard has been created to establish a standard for the supply of food products and to act as a key piece of evidence for retailers, and the brand owners to demonstrate due diligence' in the face of potential prosecution by the enforcement authoritiesAchieving certification against the BRC Global Standard for Food Safety proves your level of competence in HACPP, hygiene, food safety and quality systems. At the same time it demonstrates your commitment to consumer safety and stakeholder relations. We are approved by the BRC to offer certification audits and as the world’s leading inspection, verification, testing and certification company, we have the global network to offer this service wherever you are based. BRC Global Standard for Packaging and Packaging Materials and the BRC Global Standard for Storage and Distribution.",
  },
];

const accreditationData = [
  {
    accreditationID: 1,
    accreditationName: "AB-CAB Accredited",
    accreditationDescription:
      "Accreditation Board for Conformity Assessment Bodies (AB-CAB) is an Independent, International Accreditation Board (AB). It works to serve the global communities of businesses and consumers. AB-CAB accredits appropriately qualified independent third party Conformity Assessment Bodies (CABs) such as Certification Bodies, Inspection Bodies, Testing & Calibration Laboratories and Medical Laboratories to ensure that their competence to carry out specific tasks is as per the International Standards & the Benchmarks. AB-CAB Accreditation is voluntary in nature. AB-CAB is a trading name for “Accreditation Board For Conformity Assessment Bodies” a company limited by shares established as per requirement of , Republic of India. AB-CAB operates in accordance with the requirements, criteria, rules and regulations laid down in the following documents: The requirements of the international standard ISO/IEC 17011, General requirements for bodies providing assessments and accreditation of conformity assessment bodiesThe requirements and other benchmarks as stipulated in the Publicly Available Documents (PAD) published by various international bodies and ABCAB Legally established objectives. The authority vested is ABCAB is that assigned to them by the Conformity Assessment Bodies and other Organization it accredits and recognizes by virtue of these applicant and accredited bodies pledging support for the mission and objectives of AB-CAB and ensuring that their actions are according to that policy. It is an independent, impartial and non-governmental body and makes no claim to be connected with any government.",
  },
  {
    accreditationID: 2,
    accreditationName: "ISO 17020 Accredited",
    accreditationDescription:
      "Accreditation to ISO/IEC 17020, Conformity assessment - Requirements for the operation of various types of bodies performing inspection, is gaining momentum in industries around the globe. The broad definition of inspection in the standard allows great flexibility in application from systems to services and raw material to finished products.ISO/IEC 17020 incorporates same level of requirements for the organizational quality management system as ISO 9001 and ISO/IEC 17000 series standards such as ISO/IEC 17021, Conformity assessment - Requirements for bodies providing audit and certification of management systems, and ISO/IEC 17065, Conformity assessment -- Requirements for bodies certifying products, processes and services. ISO/IEC 17020, however, puts greater emphasis on organizational ability to manage impartiality and conflicts of interest as well as the technical competence of people, inspection processes, and equipment. Accredited inspection provides assurance of technically competent service and consistently reliable results, reducing costs and lowering risks. It is key in demonstrating that products, equipment, structures, and systems meet required specifications. Governments and industries around the world are increasingly requiring use of accredited inspection services. AB-CAB accreditation to ISO/IEC 17020 allows an organization to demonstrate integrity, reliability, and technical competence as well as compliance internationally recognized good practices.",
  },
  {
    accreditationID: 3,
    accreditationName: "ISO 17021 Accredited",
    accreditationDescription:
      "Accreditation Board for Conformity Assessment Bodies (AB-CAB) is an Independent, International Accreditation Board (AB). It works to serve the global communities of businesses and consumers. AB-CAB accredits appropriately qualified independent third party Conformity Assessment Bodies (CABs) such as Certification Bodies, Inspection Bodies, Testing & Calibration Laboratories and Medical Laboratories to ensure that their competence to carry out specific tasks is as per the International Standards & the Benchmarks. AB-CAB Accreditation is voluntary in nature. AB-CAB is a trading name for “Accreditation Board For Conformity Assessment Bodies” a company limited by shares established as per requirement of , Republic of India. AB-CAB operates in accordance with the requirements, criteria, rules and regulations laid down in the following documents: The requirements of the international standard ISO/IEC 17011, General requirements for bodies providing assessments and accreditation of conformity assessment bodiesThe requirements and other benchmarks as stipulated in the Publicly Available Documents (PAD) published by various international bodies and AB-CAB a Legally established objectives as per its by-laws.The authority vested is AB-CAB is that assigned to them by the Conformity Assessment Bodies and other Organization it accredits and recognizes by virtue of these applicant and accredited bodies pledging support for the mission and objectives of AB-CAB and ensuring that their actions are according to that policy. It is an independent, impartial and non-governmental body and makes no claim to be connected with any government.",
  },
  {
    accreditationID: 4,
    accreditationName: "Industry Accreditation",
    accreditationDescription:
      "AB-CAB provide accredaiton for Industry-Specific Accreditation and TNV have plan to apply for accreditation for the following: cGMP/GMP, EPA Energy Star, Hotel Star Rating, Food Test, TNI Environmental, Maturity Level, Green Certification, HALAL",
  },
];

const trainingData = [
  {
    trainingID: 1,
    trainingName: "Quality Management Training",
    trainingDescription:
      "A comprehensive training program on quality management systems and ISO 9001:2015 requirements.",
  },
  {
    trainingID: 2,
    trainingName: "Environmental Management Training",
    trainingDescription:
      "Training on environmental management systems and ISO 14001:2015 requirements.",
  },
  {
    trainingID: 3,
    trainingName: "Information Security Training",
    trainingDescription:
      "Training on information security management systems and ISO 27001:2013 requirements.",
  },
];

const companiesData = [
  {
    companyID: 1,
    companyName: "OneWorld InfoTech",
    companyOrigin: "Bangladesh",
    validity: "Valid",
    companyCategory: "Tech",
    companyScope: "Cybersecurity, Digital Transformation and Data Center Service",
    companyEmail: "info@techsolutions.com",
    companyPhone: "+1 (123) 456-7890",
    companyAddress: "29, Dilkusha Commercial Area, Dhaka 1000, Bangladesh",
    password: "tech123",
    certifications: [
      {
        certificationID: "2308240800101",
        serviceID: 3,
        certificationName: "ISO 9001:2015",
        issueDate: "2023-08-24",
        FirstSurveillanceDate: "2024-07-24",
        SecondSurveillanceDate: "2025-07-24",
        expiryDate: "2026-04-23",
        Accreditation:"AB-CAB",
        status: "Active",
        validity: 3,
      },
    ],
  },
  {
    companyID: 2,
    companyName: "CREATION360 LTD.",
    companyOrigin: "Bangladesh",
    validity: "Valid",
    companyCategory: "Tech",
    companyScope: "IT & ITES, Event Management, Service Provider, Advertising Agency, Printing & Press, Solution Integration, Cyber Security Services, Software Development, Software-Hardware & Networking Supply, Installation, Commissioning and Maintenance, Pre-Post Sales, IT Department, Business Continuity management, PMO, Digital Branding & Promotion, Human Resources, Procurement, Physical Security and Facility Management, On Premises & Cloud Data Center Services & Solutions",
    companyEmail: "info@techsolutions.com",
    companyPhone: "+1 (123) 456-7890",
    companyAddress: "House -151, Block-D, Road-06, Mohanagar Project, Hatirjheel, West Rampura, Dhaka-1219; Bangladesh",
    password: "tech123",
    certifications: [
      {
        certificationID: "2404190800101",
        serviceID: 3,
        certificationName: "ISO 9001:2015",
        issueDate: "2024-04-19",
        FirstSurveillanceDate: "2025-03-19",
        SecondSurveillanceDate: "2026-03-19",
        expiryDate: "2027-04-18",
        Accreditation:"AB-CAB",
        status: "Active",
        validity: 3,
      },
    ],
  },
  {
    companyID: 3,
    companyName: "CORNEA SOFT & IT SOLUTION LTD.",
    companyOrigin: "Bangladesh",
    validity: "Valid",
    companyCategory: "Tech",
    companyScope: "IT & ITES, Solution Integration, Cyber Security Services, Software Development, Software-Hardware & Networking Products Supply, Installation, Commissioning and Maintenance, Pre-Post Sales, IT Department, Service Provider, IT/ITES Training, BPO, Call Center, ISP, Technology Consultancy, Business Continuity management, PMO, Digital Branding & Promotion, Human Resources, Procurement, Physical Security and Facility Management, On Premises & Cloud Data Center Services & Solutions",
    companyEmail: "info@techsolutions.com",
    companyPhone: "+1 (123) 456-7890",
    companyAddress: "3rd Floor, 39 Sher Shah Suri Road, Mohammadpur, Dhaka - 1207, Bangladesh",
    password: "tech123",
    certifications: [
      {
        certificationID: "2404300800101",
        serviceID: 3,
        certificationName: "ISO 9001:2015",
        issueDate: "2024-04-30",
        FirstSurveillanceDate: "2025-03-30",
        SecondSurveillanceDate: "2026-03-30",
        expiryDate: "2027-04-29",
        Accreditation:"AB-CAB",
        status: "Active",
        validity: 3,
      },
    ],
  },
  {
    companyID: 4,
    companyName: "OneWorld InfoTech",
    companyOrigin: "Bangladesh",
    validity: "Valid",
    companyCategory: "Tech",
    companyScope: "Cybersecurity, Digital Transformation and Data Center Service",
    companyEmail: "info@techsolutions.com",
    companyPhone: "+1 (123) 456-7890",
    companyAddress: "29, Dilkusha Commercial Area, Dhaka 1000, Bangladesh",
    password: "tech123",
    certifications: [
      {
        certificationID: "2308240800501",
        serviceID: 3,
        certificationName: "ISO 27001",
        issueDate: "2023-08-24",
        FirstSurveillanceDate: "2024-07-24",
        SecondSurveillanceDate: "2025-07-24",
        expiryDate: "2026-08-23",
        Accreditation:"AB-CAB",
        status: "Active",
        validity: 3,
      },
    ],
    trainings: [
      {
        trainingID: 1,
        trainingName: "Quality Management Training",
        completionDate: "2022-03-10",
      },
      {
        trainingID: 2,
        trainingName: "Information Security Training",
        completionDate: "2021-12-05",
      },
    ],
    accreditations: [
      {
        accreditationID: 1,
        accreditationName: "AB-CAB Accredited",
        issueDate: "2022-05-01",
        expiryDate: "2025-05-01",
      },
    ],
  },
  {
    companyID: 5,
    companyName: "CORNEA SOFT & IT SOLUTION LTD.",
    companyOrigin: "Bangladesh",
    validity: "Valid",
    companyCategory: "Tech",
    companyScope: "IT & ITES, Solution Integration, Cyber Security Services, Software Development, Software-Hardware & Networking Products Supply, Installation, Commissioning and Maintenance, Pre-Post Sales, IT Department, Service Provider, IT/ITES Training, BPO, Call Center, ISP, Technology Consultancy, Business Continuity management, PMO, Digital Branding & Promotion, Human Resources, Procurement, Physical Security and Facility Management, On Premises & Cloud Data Center Services & Solutions",
    companyEmail: "info@techsolutions.com",
    companyPhone: "+1 (123) 456-7890",
    companyAddress: "2nd floor, Darogoa Market, Road 7/A, Zigatola, Dhanmondi, Dhaka 1209, Bangladesh",
    password: "tech123",
    certifications: [
      {
        certificationID: "2404300800501",
        serviceID: 3,
        certificationName: "ISO 27001:2022",
        issueDate: "2025-03-03",
        FirstSurveillanceDate: "2026-03-30",
        SecondSurveillanceDate: "2027-03-30",
        expiryDate: "2028-04-29",
        Accreditation:"AB-CAB",
        status: "Active",
        validity: 3,
      },
    ],
  },
  {
    companyID: 6,
    companyName: "HAJ CORPORATION",
    companyOrigin: "Bangladesh",
    validity: "Valid",
    companyCategory: "Tech",
    companyScope: "Surveillance Solution, IT Solution, Lab Solution and Building Management Systems (BMS).",
    companyEmail: "info@techsolutions.com",
    companyPhone: "+1 (123) 456-7890",
    companyAddress: "Suit-10-A, 5th floor, Sahera Tropical Centre, 218 Dr. Kudrat-E-Khuda Road, Dhaka-1205, BangladeshPostal Address: Plot#1/3, Block-A, Mohammadpur Housing Estate, Asad Gate, Dhaka-1207, Bangladesh",
    password: "tech123",
    certifications: [
      {
        certificationID: "2412030800101",
        serviceID: 3,
        certificationName: "ISO 9001:2015",
        issueDate: "2024-03-12",
        FirstSurveillanceDate: "2025-03-11",
        SecondSurveillanceDate: "2026-03-11",
        expiryDate: "2027-02-12",
        Accreditation:"AB-CAB",
        status: "Active",
        validity: 3,
      },
    ],
  },
];


export { servicesData, accreditationData, trainingData, companiesData };
