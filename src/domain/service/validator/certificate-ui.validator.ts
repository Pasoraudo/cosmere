import {Certificate} from 'domain/model/certificate.model';
import {isEmpty, isUndefined} from 'lodash-es';
import {isArray, isNull} from 'lodash';

export interface CertificateStepValidation {
  items: {
    status: TypeValidationType;
    name: string;
    message: string;
  }[];
}

export const validateStepValidationType = (validation: CertificateStepValidation): TypeValidationType => {
  const status = validation.items.map(item => item.status);
  if (status.includes('error')) {
    return 'error';
  }
  if (status.includes('warning')) {
    return 'warning';
  }
  return 'valid';
};

export const validateStep = (certificate: Certificate, step: number): CertificateStepValidation => {
  switch (step) {
    case 1:
      return validateStep1(certificate);
    case 2:
      return validateStep2(certificate);
    case 3:
      return validateStep3(certificate);
    case 4:
      return validateStep4(certificate);
    case 5:
      return validateStep5(certificate);
    case 6:
      return validateStep6(certificate);
    case 7:
      return validateStep7(certificate);
    case 8:
      return validateStep8(certificate);
  }
};

export const validateStep1 = (certificate: Certificate, required: boolean = true): CertificateStepValidation => {

  const validation = {
    items: []
  };

  if (isEmpty(certificate))
    return validation;

  if (certificate.origin === 'test') {
    const certificatePropertiesRequired = [
      'productGroupTypeId',
      'productTypeId',
      'brandId',
      'evaluationSystem',
      'testDate',
      'status'
    ];

    certificatePropertiesRequired.forEach((property) => {
      if (valueIsEmpty(certificate[property])) {
        validation.items.push({
          name: property,
          status: 'error',
          message: `El campo ${property} es requerido`
        });
      }
    });

    if (valueIsEmpty(certificate.testAddress.postalCode)) {
      validation.items.push({
        name: 'testPostalCode',
        status: 'error',
        message: 'El campo testPostalCode es requerido'
      });
    }

    if (valueIsEmpty(certificate.testAddress.address)) {
      validation.items.push({
        name: 'testAddress',
        status: 'error',
        message: 'El campo testAddress es requerido'
      });
    }

    if (certificate.renovationDateApply === 'apply' && valueIsEmpty(certificate.renovationDate)) {
      validation.items.push({
        name: 'renovationDate',
        status: 'error',
        message: 'El campo renovationDate es requerido'
      });
    }

  }

  if (certificate.origin === 'model') {
    const certificatePropertiesRequired = [
      'name',
      'productGroupTypeId',
      'productTypeId',
      'parentCertificateId',
      'brandId',
    ];

    certificatePropertiesRequired.forEach((property) => {
      if (valueIsEmpty(certificate[property])) {
        validation.items.push({
          name: property,
          status: 'error',
          message: `El campo ${property} es requerido`
        });
      }
    });
  }

  if (certificate.origin === 'kit') {
    const certificatePropertiesRequired = [
      'name',
      'productGroupTypeId',
      'productTypeId',
      'brandId',
    ];

    certificatePropertiesRequired.forEach((property) => {
      if (valueIsEmpty(certificate[property])) {
        validation.items.push({
          name: property,
          status: 'error',
          message: `El campo ${property} es requerido`
        });
      }
    });
  }

  return validation;
};
export const validateStep2 = (certificate: Certificate, required: boolean = true): CertificateStepValidation => {
  const validation = {
    items: []
  };

  if (isEmpty(certificate))
    return validation;

  if (['test', 'model', 'kit'].includes(certificate.origin)) {
    let certificatePropertiesRequired = [
      'drive',
      'crystal',
      'smallPedestrianGate',
      'userTrainings',
      'finishTypeIds',
      'height',
      'width',
      'weight',
    ];

    if (certificate.drive === 'motorised') {
      certificatePropertiesRequired.push('driveType');
      certificatePropertiesRequired.push('environments');
      certificatePropertiesRequired.push('impulseTypes');
    }

    if (certificate.productGroupTypeId === 'pedestrian') {
      return {
        items: []
      };

      certificatePropertiesRequired = [
        'drive',
        'height',
        'width',
        'weight',
        'activationType',
        'activationFirstEntry',
        'openSensor',
        'activationManualType',
        'activationCloseType',
        'closeSensor',
        'activationCloseManualType',
        'emergencyExist',
        'emergencyComponent',
        'unsympatheticSystem',
        'crystalSurface',
        'sheetFixedCount',
        'sheetMobileCount',
        'heightPass',
        'widthPass',
      ];
    }

    certificatePropertiesRequired.forEach((property) => {
      if (valueIsEmpty(certificate[property])) {
        validation.items.push({
          name: property,
          status: 'error',
          message: `El campo ${property} es requerido`
        });
      }

    });
  }


  return validation;
};

const valueIsEmpty = (value: any): boolean => isNull(value) || isUndefined(value) || (isArray(value) && isEmpty(value)) || value?.length === 0;

export const validateStep3 = (certificate: Certificate, required: boolean = true): CertificateStepValidation => {

  const validation = {
    items: []
  };

  if (isEmpty(certificate))
    return validation;

  if (['test', 'model', 'kit'].includes(certificate.origin)) {


    const certificatePropertiesRequired = [
      'emission',
      'glassDefinition',
      'thermalResistance',
      'permeability',
      'durability',
    ];

    certificatePropertiesRequired.forEach((property) => {
      if (valueIsEmpty(certificate[property])) {
        validation.items.push({
          name: property,
          status: 'error',
          message: `El campo ${property} es requerido`
        });
      }
    });

    const errorConditions = [
      certificate.drive === 'motorised' && certificate.maneuveringForce !== 'comply',
      certificate.drive === 'manual' && certificate.maneuveringForce !== 'NPD',
      !certificate.windResistance.startsWith('class'),
      certificate.safeOpening === 'not_comply', //TODO: Cumple, puertas verticales. NPD resto
      certificate.mechanicalStrength !== 'comply',
    ];

    if (certificate.drive === 'motorised' && certificate.maneuveringForce !== 'comply')
      validation.items.push({
        name: 'maneuveringForce',
        status: 'error',
        message: 'El campo Manejo de fuerza no cumple'
      });

    if (certificate.drive === 'manual' && certificate.maneuveringForce !== 'NPD')
      validation.items.push({
        name: 'maneuveringForce',
        status: 'error',
        message: 'El campo Manejo de fuerza no cumple'
      });

    if (!certificate.windResistance.startsWith('class'))
      validation.items.push({
        name: 'windResistance',
        status: 'error',
        message: 'El campo Resistencia al viento no cumple'
      });

    if (certificate.safeOpening === 'not_comply')
      validation.items.push({
        name: 'safeOpening',
        status: 'error',
        message: 'El campo Apertura segura no cumple'
      });

    if (certificate.mechanicalStrength !== 'comply')
      validation.items.push({
        name: 'mechanicalStrength',
        status: 'error',
        message: 'El campo Resistencia mecánica no cumple'
      });


  }

  return validation;
};
export const validateStep4 = (certificate: Certificate, required: boolean = true): CertificateStepValidation => {
  const validation = {
    items: []
  };

  if (isEmpty(certificate))
    return validation;

  const components = certificate.components.filter(c => c.status !== 'disabled' && c.status !== 'replaced');

  const componentPropertiesRequired = [
    'brandId',
    'componentTypeId',
    'componentModelId'
  ];

  const componentPropertiesRecomended = [];

  if (!['kit', 'model'].includes(certificate.origin))
    componentPropertiesRequired.push('serialNumber');

  for (const component of components) {
    componentPropertiesRequired.forEach((property) => {
      if (valueIsEmpty(component[property])) {
        validation.items.push({
          name: 'component',
          status: 'error',
          message: `El campo ${property} es requerido`
        });
      }
    });

    componentPropertiesRecomended.forEach((property) => {
      if (valueIsEmpty(component[property])) {
        validation.items.push({
          name: 'component',
          status: 'warning',
          message: `El campo ${property} es recomendado`
        });
      }
    });
  }

  return validation;
};
export const validateStep5 = (certificate: Certificate, required: boolean = true): CertificateStepValidation => {
  const validation = {
    items: []
  };

  if (isEmpty(certificate) || !required)
    return validation;

  if (certificate.origin === 'model')
    return validation;

  if (!valueIsEmpty(certificate.strengthTest.pdfId)) {
    const testPoints = certificate.strengthTest.testPoints;
    const hasInvaildTestPoints = testPoints.some(tp => (valueIsEmpty(tp.limitFd) || valueIsEmpty(tp.limitTd) || valueIsEmpty(tp.limitFe)));
    if (hasInvaildTestPoints) {
      validation.items.push({
        name: 'strengthTest',
        status: 'error',
        message: 'El campo Puntos de prueba no cumple'
      });
    }
  }

  if (!valueIsEmpty(certificate.windTest.pdfId)) {
    if (valueIsEmpty(certificate.windTest.windTest.weight))
      validation.items.push({
        name: 'windTest',
        status: 'error',
        message: 'El campo Peso no cumple'
      });
    if (valueIsEmpty(certificate.windTest.windTest.surface))
      validation.items.push({
        name: 'windTest',
        status: 'error',
        message: 'El campo Superficie no cumple'
      });

    if (valueIsEmpty(certificate.windTest.windTest.surfaceExposed))
      validation.items.push({
        name: 'windTest',
        status: 'error',
        message: 'El campo Superficie expuesta no cumple'
      });
    if (isEmpty(certificate.windTest.windDeformation.deformation1))
      validation.items.push({
        name: 'windTest',
        status: 'error',
        message: 'El campo Deformación 1 no cumple'
      });
    if (isEmpty(certificate.windTest.windDeformation.deformation2))
      validation.items.push({
        name: 'windTest',
        status: 'error',
        message: 'El campo Deformación 2 no cumple'
      });
    if (isEmpty(certificate.windTest.windDeformation.deformation3))
      validation.items.push({
        name: 'windTest',
        status: 'error',
        message: 'El campo Deformación 3 no cumple'
      });
  }

  return validation;
};
export const validateStep6 = (certificate: Certificate, required: boolean = true): CertificateStepValidation => {
  const validation = {
    items: []
  };

  if (isEmpty(certificate) || isEmpty(certificate.riskAnalysis))
    return validation;

  if (certificate.origin === 'model')
    return validation;


  for (const section of certificate.riskAnalysis.sections) {
    for (const requirement of section.requirements) {
      if (required && requirement.answer.value === 'not_comply')
        validation.items.push({
          name: 'riskAnalysis',
          status: 'error',
          message: 'No cumple: ' + requirement.answer.additionalInfo //TODO: Title
        });

      if (requirement.answer.value === 'comply' && isEmpty(requirement.answer.info))
        validation.items.push({
          name: 'riskAnalysis',
          status: 'warning',
          message: 'No se ha registrado información'
        });
    }
  }

  return validation;
};
export const validateStep7 = (certificate: Certificate, required: boolean = true): CertificateStepValidation => {
  const validation = {
    items: []
  };

  if (isEmpty(certificate))
    return validation;

  for (const maintenance of certificate.maintenance.maintenances) {
    for (const operation of maintenance.operations) {
      return validation;
    }
  }

  validation.items.push({
    name: 'maintenance',
    status: 'error',
    message: 'No se ha registrado información'
  });

  return validation;
};
export const validateStep8 = (certificate: Certificate, required: boolean = true): CertificateStepValidation => ({items: []});


export const getCertificateItemsValidation = (certificate: Certificate): CertificateStepValidation => {

  const validation = {
    items: []
  };

  validation.items.push(...validateStep1(certificate).items);
  validation.items.push(...validateStep2(certificate).items);
  validation.items.push(...validateStep3(certificate).items);
  validation.items.push(...validateStep4(certificate).items);
  validation.items.push(...validateStep5(certificate).items);
  validation.items.push(...validateStep6(certificate).items);
  validation.items.push(...validateStep7(certificate).items);
  validation.items.push(...validateStep8(certificate).items);

  return validation;
};


export const validateCertificate = (certificate: Certificate): TypeValidationType => {
  let errorStep: TypeValidationType = 'valid';

  if (validateStepValidationType(validateStep1(certificate)) === 'error')
    errorStep = 'error';
  if (validateStepValidationType(validateStep2(certificate)) === 'error')
    errorStep = 'error';
  if (validateStepValidationType(validateStep3(certificate)) === 'error')
    errorStep = 'error';
  if (validateStepValidationType(validateStep4(certificate)) === 'error')
    errorStep = 'error';
  if (validateStepValidationType(validateStep5(certificate)) === 'error')
    errorStep = 'error';
  if (validateStepValidationType(validateStep6(certificate)) === 'error')
    errorStep = 'error';
  if (validateStepValidationType(validateStep7(certificate)) === 'error')
    errorStep = 'error';

  return errorStep;
};

export type TypeValidationType = 'valid' | 'error' | 'warning';
