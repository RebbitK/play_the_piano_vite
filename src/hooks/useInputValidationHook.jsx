import { useState } from 'react';
import Swal from 'sweetalert2';

export const useInputValidationHook = (validateFn, validationMessage) => {
  const [value, setValue] = useState('')

  const validate = async () => {
    if (!validateFn(value)) {
      await Swal.fire({
        title: '유효하지 않은 입력',
        text: validationMessage,
        icon: 'error',
        confirmButtonText: '확인',
        confirmButtonColor: '#3085d6'
      })
      throw new Error()
    }
  }

  return { value, setValue, validate }
}
