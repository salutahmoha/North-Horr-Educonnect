// import React, { useState } from 'react';
// import { useMutation } from 'react-query';
// import apiBase from '../../utils/apiBase';
// import toast from 'react-simple-toasts';
// import "react-simple-toasts/dist/style.css";
// import useUserStore from '../../../../server/src/store/useStore';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import { UpdatePasswordContainer, UpdatePasswordForm, Heading, PasswordField, PasswordInput, EyeIcon, Button } from '../StyledComponents/UpdatePasswordStyled';

// function UpdatePassword() {
//     const [prevPassword, setPrevPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [showPrevPassword, setShowPrevPassword] = useState(false);
//     const [showNewPassword, setShowNewPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const setUser = useUserStore(state => state.setUser);

//     const { mutate, isLoading } = useMutation({
//         mutationFn: async (passwords) => {
//             const response = await fetch(`${apiBase}/auth/password`, {
//                 method: 'PATCH',
//                 body: JSON.stringify(passwords),
//                 headers: { 'Content-Type': 'application/json' },
//                 credentials: "include"
//             });
//             if (!response.ok) {
//                 const error = await response.json();
//                 throw new Error(error.message);
//             }
//             const data = await response.json();
//             return data;
//         },
//         onSuccess: () => {
//             toast("Password updated successfully", { theme: "toast-success", duration: 3000 });
//         },
//         onError: (error) => {
//             toast(error.message, { theme: "toast-error", duration: 3000 });
//         }
//     });

//     function handleUpdatePassword(e) {
//         e.preventDefault();
//         if (!prevPassword) {
//             return toast("Previous password required", { theme: "toast-error", duration: 3000 });
//         }
//         if (!newPassword) {
//             return toast("New password required", { theme: "toast-error", duration: 3000 });
//         }
//         if (!confirmPassword) {
//             return toast("Confirm password required", { theme: "toast-error", duration: 3000 });
//         }
//         if (newPassword !== confirmPassword) {
//             return toast("New password and confirm password do not match", { theme: "toast-error", duration: 3000 });
//         }
//         mutate({ prevPassword, newPassword });
//     }

//     return (
//         <UpdatePasswordContainer>
//             <UpdatePasswordForm>
//                 <Heading>Update Your Password</Heading>
//                 <div className='update-password'>
//                     <label htmlFor="previous-password">Previous Password</label>
//                     <PasswordField>
//                         <PasswordInput
//                             type={showPrevPassword ? "text" : "password"}
//                             name='previous-password'
//                             id='previous-password'
//                             placeholder='Enter your previous password'
//                             value={prevPassword}
//                             onChange={(e) => setPrevPassword(e.target.value)}
//                         />
//                         <EyeIcon
//                             onClick={() => setShowPrevPassword(!showPrevPassword)}
//                         >
//                             <FontAwesomeIcon icon={showPrevPassword ? faEyeSlash : faEye} />
//                         </EyeIcon>
//                     </PasswordField>

//                     <label htmlFor="new-password">New Password</label>
//                     <PasswordField>
//                         <PasswordInput
//                             type={showNewPassword ? "text" : "password"}
//                             name='new-password'
//                             id='new-password'
//                             placeholder='Enter your new password'
//                             value={newPassword}
//                             onChange={(e) => setNewPassword(e.target.value)}
//                         />
//                         <EyeIcon
//                             onClick={() => setShowNewPassword(!showNewPassword)}
//                         >
//                             <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
//                         </EyeIcon>
//                     </PasswordField>

//                     <label htmlFor="confirm-password">Confirm Password</label>
//                     <PasswordField>
//                         <PasswordInput
//                             type={showConfirmPassword ? "text" : "password"}
//                             name='confirm-password'
//                             id='confirm-password'
//                             placeholder='Confirm your new password'
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                         />
//                         <EyeIcon
//                             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                         >
//                             <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
//                         </EyeIcon>
//                     </PasswordField>

//                     <Button type='submit' disabled={isLoading} onClick={handleUpdatePassword}>
//                         {isLoading ? 'Updating...' : 'Update Password'}
//                     </Button>
//                 </div>
//             </UpdatePasswordForm>
//         </UpdatePasswordContainer>
//     );
// }

// export default UpdatePassword;
