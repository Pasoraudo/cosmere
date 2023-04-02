import {Certificate, CertificateOrigin} from '../../domain/model/certificate.model';
import {ProductGroupType} from '../../domain/model/product.model';

const isUniversalField = (field: string): boolean => ['brandId', 'evaluationSystem', 'labId', 'testDate', 'testAddress', 'drive', 'renovationDate', 'crystalSurface',
  'height', 'weight', 'width', 'productGroupTypeId', 'certificateCode', 'imageId', 'driveType', 'finishType', 'name', 'productTypeId', 'origin']
  .includes(field);

const isNotPedestrianField = (field: string): boolean => ['smallPedestrianGate', 'userTrainings', 'environments', 'impulseTypes', 'ceType']
  .includes(field);
const isNotCiagField = (field: string): boolean => ['securityOpenSensorType', 'activationManualType', 'activationCloseType', 'securityCloseSensorType',
  'activationCloseManualType', 'operatingMode', 'unsympatheticSystem', 'blockSystem', 'emergencyExist', 'heightPass', 'widthPass', 'sheetFixedCount',
  'sheetMobileCount']
  .includes(field);

export const hideCertificateField = (field: string, certificate?: Certificate, origin?: CertificateOrigin, productGroupTypeId?: ProductGroupType): boolean => {

  if (certificate && mustHideFieldWithCertificate(field, certificate))
    return true;
  else if (origin && productGroupTypeId && hideCertificateFieldWithOriginAndProductGroupTypeId(field, origin, productGroupTypeId))
    return true;
  else if (origin && hideCertificateFieldWithOrigin(field, origin))
    return true;
  else if (productGroupTypeId && hideCertificateFieldWithProductGroupType(field, productGroupTypeId))
    return true;

  return false;
};

const mustHideFieldWithCertificate = (field: string, certificate: Certificate): boolean => {
  if (field === 'labId' && (certificate.origin === 'test' && certificate.productGroupTypeId === 'pedestrian')) {
    return true;
  } else if (field === 'renovationDate' && !certificate.labId) {
    return true;
  } else if (field === 'securityOpenSensorType' && certificate.closeLowEnergyMovement !== 'no') {
    return true;
  } else if (field === 'activationManualType' && certificate.activationType !== 'manual') {
    return true;
  } else if (field === 'activationCloseType' && certificate.activationCloseType !== 'manual') {
    return true;
  } else if (field === 'securityCloseSensorType' && certificate.closeLowEnergyMovement !== 'no') {
    return true;
  } else if (field === 'activationCloseManualType' && certificate.activationCloseType !== 'manual') {
    return true;
  } else if (field === 'unsympatheticSystem' && certificate.emergencyExist !== 'yes') {
    return true;
  }

  return hideCertificateFieldWithOriginAndProductGroupTypeId(field, certificate.origin, certificate.productGroupTypeId);
};

const hideCertificateFieldWithOriginAndProductGroupTypeId = (field: string, origin: CertificateOrigin, productGroupTypeId: ProductGroupType): boolean => {
  if (field === 'evaluationSystem' && origin === 'test' && productGroupTypeId === 'pedestrian') {
    return true;
  } else if (field === 'drive' && productGroupTypeId !== 'pedestrian' && ['test', 'automation'].includes(origin)) {
    return true;
  }

  if (hideCertificateFieldWithProductGroupType(field, productGroupTypeId))
    return true;
  else if (hideCertificateFieldWithOrigin(field, origin))
    return true;

  return false;
};

const hideCertificateFieldWithProductGroupType = (field: string, productGroupTypeId: ProductGroupType): boolean => {
  if (productGroupTypeId === 'ciag' && isNotCiagField(field))
    return true;
  else if (productGroupTypeId === 'pedestrian' && isNotPedestrianField(field))
    return true;

  return false;
};
const hideCertificateFieldWithOrigin = (field: string, origin: CertificateOrigin): boolean => {
  if (field === 'name') {
    return !['model', 'kit'].includes(origin);
  } else if (field === 'productGroupTypeId') {
    return ['production', 'adequacy', 'automation'].includes(origin);
  } else if (field === 'origin') {
    return ['test', 'model', 'production', 'adequacy', 'automation', 'kit', 'config'].includes(origin);
  } else if (field === 'certificateCode') {
    return ['model', 'kit', 'config'].includes(origin);
  } else if (field === 'parentProductModelId') {
    return ['test', 'model', 'config', 'adequacy', 'automation'].includes(origin);
  } else if (field === 'parentCertificateId') {
    return ['test', 'adequacy', 'automation', 'installation', 'kit', 'config'].includes(origin);
  } else if (field === 'brandId') {
    return ['production', 'adequacy', 'automation', 'config'].includes(origin);
  } else if (field === 'clientId') {
    return !['production', 'automation', 'installation', 'adequacy'].includes(origin);
  } else if (field === 'installPostalCode') {
    return !['production', 'adequacy', 'automation', 'installation'].includes(origin);
  } else if (field === 'installAddress') {
    return !['production', 'adequacy', 'automation', 'installation'].includes(origin);
  } else if (field === 'productionDate') {
    return !['production', 'adequacy', 'automation'].includes(origin);
  } else if (field === 'installDate') {
    return !['production', 'installation'].includes(origin);
  } else if (field === 'evaluationSystem') {
    return origin !== 'test';
  } else if (field === 'labId') {
    return origin !== 'test';
  } else if (field === 'testDate') {
    return origin !== 'test';
  } else if (field === 'renovationDate') {
    return origin !== 'test';
  } else if (field === 'renovationDateApply') {
    return origin !== 'test';
  } else if (field === 'testAddress') {
    return origin !== 'test';
  } else if (field === 'drive') {
    return ['automation','test'].includes(origin);
  } else if (field === 'driveType') {
    return origin === 'config';
  } else if (field === 'crystalSurface') {
    return origin === 'config';
  } else if (field === 'openLowEnergyMovement') {
    return origin === 'config';
  } else if (field === 'securityOpenSensorType') {
    return origin === 'config';
  } else if (field === 'activationManualType') {
    return origin === 'config';
  } else if (field === 'closeLowEnergyMovement') {
    return origin === 'config';
  } else if (field === 'securityCloseSensorType') {
    return origin === 'config';
  } else if (field === 'activationCloseManualType') {
    return origin === 'config';
  } else if (field === 'operatingMode') {
    return origin === 'config';
  } else if (field === 'emergencyExist') {
    return origin === 'config';
  } else if (field === 'operatorType') {
    return origin === 'config';
  } else if (field === 'blockSystem') {
    return origin === 'config';
  } else if (field === 'heightPass') {
    return origin === 'config';
  } else if (field === 'height') {
    return origin === 'config';
  } else if (field === 'widthPass') {
    return origin === 'config';
  } else if (field === 'width') {
    return origin === 'config';
  } else if (field === 'weight') {
    return origin === 'config';
  } else if (field === 'finishType') {
    return origin === 'config';

  } else if (field === 'productionType') {
    return origin !== 'production';
  } else if (field === 'ceType') {
    return ['test', 'kit', 'automation', 'installation'].includes(origin);
  } else if (field === 'allowInstallation') {
    return ['installation', 'adequacy', 'automation','test'].includes(origin);
  }
  return false;
};
