// import { useCall, PermissionRequestEvent } from "@stream-io/video-react-sdk";
// import { useCallback, useEffect, useState } from "react";

// export const PermissionRequestsPanel = () => {
//   // this hook will take the call instance from the <StreamCall /> context.
//   const call = useCall();
//   const [permissionRequests, setPermissionRequests] = useState<
//     PermissionRequestEvent[]
//   >([]);

//   useEffect(() => {
//     return call?.on("call.permission_request", (event) => {
//       const request = event as PermissionRequestEvent;
//       setPermissionRequests((reqs) => [...reqs, request]);
//     });
//   }, [call]);

//   const handlePermissionRequest = useCallback(
//     async (request: PermissionRequestEvent, accept: boolean) => {
//       const { user, permissions } = request;
//       try {
//         if (accept) {
//           await call?.grantPermissions(user.id, permissions);
//         } else {
//           await call?.revokePermissions(user.id, permissions);
//         }
//         setPermissionRequests((reqs) => reqs.filter((req) => req !== request));
//       } catch (err) {
//         console.error(`Error granting or revoking permissions`, err);
//       }
//     },
//     [call]
//   );

//   if (!permissionRequests.length) return null;

//   return (
//     <div className="permission-requests">
//       <h4>Permission Requests</h4>
//       {permissionRequests.map((request) => (
//         <div className="permission-request" key={request.user.id}>
//           <span>
//             {request.user.name} requested to {request.permissions.join(", ")}
//           </span>
//           <button
//             onClick={() => handlePermissionRequest(request, true)}
//             style={{ backgroundColor: "green" }}
//           >
//             Approve
//           </button>
//           <button onClick={() => handlePermissionRequest(request, false)}>
//             Deny
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };
import { useCall, PermissionRequestEvent } from "@stream-io/video-react-sdk";
import { useCallback, useEffect, useState } from "react";

export const PermissionRequestsPanel = () => {
  // Access the call instance from the <StreamCall /> context.
  const call = useCall();
  const [permissionRequests, setPermissionRequests] = useState<
    PermissionRequestEvent[]
  >([]);

  useEffect(() => {
    // Listen for permission request events.
    return call?.on("call.permission_request", (event) => {
      const request = event as PermissionRequestEvent;
      setPermissionRequests((reqs) => [...reqs, request]);
    });
  }, [call]);

  const handlePermissionRequest = useCallback(
    async (request: PermissionRequestEvent, accept: boolean) => {
      const { user, permissions } = request;

      try {
        if (accept) {
          await call?.grantPermissions(user.id, permissions);
        } else {
          await call?.revokePermissions(user.id, permissions);
        }

        // Remove the processed request from the list.
        setPermissionRequests((reqs) => reqs.filter((req) => req !== request));
      } catch (err) {
        console.error(`Error granting or revoking permissions`, err);
      }
    },
    [call]
  );

  // If no permission requests, render nothing.
  if (!permissionRequests.length) return null;

  return (
    <div className="w-full max-w-md mx-auto bg-gray-800 shadow-md rounded-lg overflow-hidden mb-6">
      <div className="px-6 py-4 bg-gray-700 border-b border-gray-600">
        <h2 className="text-lg font-semibold text-white">
          Permission Requests
        </h2>
      </div>
      <div className="divide-y divide-gray-600">
        {permissionRequests.map((request) => (
          <div key={request.user.id} className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-200">
                {request.user.name} requested to{" "}
                {request.permissions.join(", ")}
              </p>
              <div className="flex space-x-2 mt-2 sm:mt-0">
                <button
                  onClick={() => handlePermissionRequest(request, true)}
                  className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Approve
                </button>
                <button
                  onClick={() => handlePermissionRequest(request, false)}
                  className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Deny
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
