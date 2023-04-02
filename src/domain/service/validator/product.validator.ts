import {ComponentModel} from 'domain/model/productModel.model';
import {isEmpty} from 'lodash-es';

export const validateComponentModel = (model: ComponentModel): boolean => {
  if (isEmpty(model.name)) return false;
  if (isEmpty(model.companyId)) return false;
  if (isEmpty(model.doorTypeId)) return false;
  if (isEmpty(model.brandId)) return false;
  if (isEmpty(model.componentTypeId)) return false;
  if (isEmpty(model.status)) return false;
  if (isEmpty(model.productGroupId)) return false;

  return true;
};
