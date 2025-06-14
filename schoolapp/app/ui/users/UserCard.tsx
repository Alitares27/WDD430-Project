import React from 'react';
import Image from 'next/image';
import Button from '@/app/ui/button';
import { Users } from '@/app/lib/definitions';

interface UserCardProps {
    user: Users;
    onViewDetails?: (userId: string) => void;
    onEdit?: (userId: string) => void;
    onDelete?: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({
    user,
    onViewDetails,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="
            bg-white
            rounded-lg
            shadow-md
            p-6
            flex flex-col
            items-center
            text-center
            transition-transform
            transform
            hover:scale-105
            hover:shadow-lg
        ">

            <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {user.first_name} {user.last_name}
            </h3>
            {typeof user.role === 'string' && (
                <p className="text-cyan-500 text-sm font-semibold mb-1">
                    <strong>Role:</strong> {user.role.toLowerCase()}
                </p>
            )}

            <div className="
                flex flex-wrap
                justify-center
                gap-2
                mt-auto
            ">
                {onViewDetails && (
                    <Button
                        onClick={() => onViewDetails(user.user_id)}
                        variant="primary"
                        size="sm"
                    >
                        View Details
                    </Button>
                )}
                {onEdit && (
                    <Button
                        onClick={() => onEdit(user.user_id)}
                        variant="secondary"
                        size="sm"
                    >
                        Edit
                    </Button>
                )}
                {onDelete && (
                    <Button
                        onClick={() => onDelete(user.user_id)}
                        variant="danger"
                        size="sm"
                    >
                        Delete
                    </Button>
                )}
            </div>
        </div>
    );
};

export default UserCard;
