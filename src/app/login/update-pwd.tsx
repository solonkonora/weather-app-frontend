// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import { toast } from 'react-toastify';

// const UpdatePassword: React.FC = () => {
//   const router = useRouter();
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
    
//     if (newPassword !== confirmPassword) {
//       setError('New passwords do not match.');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const response = await fetch('/api/auth/update-password', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ currentPassword, newPassword }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to update password');
//       }

//       toast.success('Password updated successfully');
//       router.push('/dashboards'); // Redirect after successful update
//     } catch (error) {
//       setError((error as Error).message);
//       toast.error(error.message || 'An error occurred');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-blue-100">
//       <div className="bg-white shadow-md rounded-lg p-10 w-96">
//         <h2 className="text-3xl font-bold mb-8 text-center">Update Password</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-6">
//             <label htmlFor="currentPassword" className="block text-lg font-medium text-gray-700">
//               Current Password
//             </label>
//             <input
//               type="password"
//               id="currentPassword"
//               value={currentPassword}
//               onChange={(e) => setCurrentPassword(e.target.value)}
//               className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-400"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label htmlFor="newPassword" className="block text-lg font-medium text-gray-700">
//               New Password
//             </label>
//             <input
//               type="password"
//               id="newPassword"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-400"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700">
//               Confirm New Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-400"
//               required
//             />
//             {error && <p className="text-red-500 text-sm">{error}</p>}
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="disabled:bg-slate-400 w-full bg-blue-400 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition duration-200"
//           >
//             {isLoading ? 'Updating...' : 'Update Password'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdatePassword;
