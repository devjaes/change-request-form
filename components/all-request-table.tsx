"use client";
import { useEffect, useState } from 'react';
import { createClient } from "@/utils/supabase/client";

interface Request {
    change_description: string;
    change_reason: string;
    created_at: string;
    id: number;
    impact_change: string;
    project_name: string;
    proposed_action: string;
    request_name: string;
    requested_by: string | null;

}

const AllRequestTable: React.FC = () => {
    const supabase = createClient();
    const [requests, setRequests] = useState<any[]>([]);


    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const { data, error } = await supabase
                    .from("change_request")
                    .select(`change_description, change_reason, created_at, id, impact_change, project_name, proposed_action, request_name, requested_by(user_name)`)
                if (error) {
                    throw error;
                }
                setRequests(data);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };
        fetchRequests();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Request Name</th>
                    <th>Change Description</th>
                    <th>Change Reason</th>
                    <th>Impact of Change</th>
                    <th>Requested by</th>
                </tr>
            </thead>
            <tbody>
                {requests.map((request) => (
                    <tr key={request.id}>
                        <td>{request.request_name}</td>
                        <td>{request.change_description}</td>
                        <td>{request.change_reason}</td>
                        <td>{request.impact_change}</td>
                        <td>{request.requested_by}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AllRequestTable;
