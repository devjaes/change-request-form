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
    request_by: number | null;
    request_name: string;
}

const AllRequestTable: React.FC = () => {
    const supabase = createClient();
    const [requests, setRequests] = useState<Request[]>([]);


    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const { data, error } = await supabase
                    .from("change_request")
                    .select("*")
                if (error) {
                    throw error;
                }
                console.log(data);
                setRequests(data);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };
        fetchRequests();
    }, []);

    console.log(requests);
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
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AllRequestTable;
