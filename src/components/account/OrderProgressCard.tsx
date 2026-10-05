import React from 'react';
import {
  OrderTracking,
  OrderTrackingProps,
  OrderTrackingStepper,
  OrderTrackingStepperProps,
  OrderTrackingStep,
  TRACKING_STEPS,
  getStepIndexFromStatus
} from '../../pages/AccountPage';

export {
  OrderTrackingStepper,
  TRACKING_STEPS,
  getStepIndexFromStatus
};
export type {
  OrderTrackingStepperProps,
  OrderTrackingStep
};

export interface OrderProgressCardProps extends OrderTrackingProps {}

export const OrderProgressCard: React.FC<OrderProgressCardProps> = (props) => {
  return <OrderTracking {...props} />;
};

export default OrderProgressCard;
