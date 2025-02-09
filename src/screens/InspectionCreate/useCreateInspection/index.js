import monk from '@monkvision/corejs';
import { useRequest } from '@monkvision/toolkit';
import useAuth from 'hooks/useAuth';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

export const TASKS_BY_MOD = {
  vinNumber: 'images_ocr',
  car360: 'damage_detection',
  wheels: 'wheel_analysis',
  classic: 'damage_detection',
};

export default function useCreateInspection() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const [inspectionId, setInspectionId] = useState();

  const axiosRequest = useCallback(async () => {
    const taskOptions = { status: monk.types.ProgressStatusUpdate.NOT_STARTED };
    const tasks = {
      wheelAnalysis: taskOptions,
      imagesOcr: taskOptions,
      damageDetection: taskOptions,
    };

    return monk.entity.inspection.createOne({ tasks });
  }, []);

  const handleRequestSuccess = useCallback(({ entities, result }) => {
    setInspectionId(result);
    dispatch(monk.actions.gotOneInspection({ entities, result }));
  }, [dispatch]);

  const canRequest = useCallback(() => isAuthenticated, [isAuthenticated]);

  const request = useRequest({
    request: axiosRequest,
    onRequestSuccess: handleRequestSuccess,
    canRequest,
  });

  return { ...request, inspectionId };
}
