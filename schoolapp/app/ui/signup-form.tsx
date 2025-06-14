'use client';
import React, { useState } from "react";

type UserRole = "student" | "teacher" | "admin";

interface SignupFormData {
    user_id: string;
    username: string;
    email: string;
    password_hash: string;
    first_name: string;
    last_name: string;
    role: UserRole;
    is_active: boolean;
    is_email_confirmed: boolean;
    last_login_at?: string | null;
    created_at: string;
}

const initialFormState: SignupFormData = {
    user_id: "",
    username: "",
    email: "",
    password_hash: "",
    first_name: "",
    last_name: "",
    role: "student",
    is_active: true,
    is_email_confirmed: false,
    last_login_at: null,
    created_at: new Date().toISOString(),
};

const SignupForm: React.FC = () => {
    const [form, setForm] = useState<SignupFormData>(initialFormState);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        const { name, value, type } = target;
        const checked = (target as HTMLInputElement).checked;
        setForm((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : name === "last_login_at"
                        ? value === "" ? null : value
                        : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log(form);
    };

    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const validateForm = () => {
        const errors: { [key: string]: string } = {};
        if (!form.user_id) errors.user_id = "User ID is required";
        if (!form.username) errors.username = "Username is required";
        if (!form.email) errors.email = "Email is required";
        if (!form.password_hash) errors.password_hash = "Password is required";
        if (!form.first_name) errors.first_name = "First name is required";
        if (!form.last_name) errors.last_name = "Last name is required";
        if (!form.role) errors.role = "Role is required";
        if (form.is_active === undefined) errors.is_active = "Active status is required";
        if (form.is_email_confirmed === undefined) errors.is_email_confirmed = "Email confirmation status is required";
        if (!form.created_at) errors.created_at = "Created at is required";
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const router = {
        back: () => window.history.back(),
    };

    const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string }> = ({ children, ...props }) => (
        <button
            {...props}
            className={`px-4 py-2 rounded ${props.variant === "primary" ? "bg-cyan-600 text-white" : "bg-gray-200 text-gray-800"} hover:opacity-90`}
        >
            {children}
        </button>
    );

    const Input: React.FC<{
        id: string;
        label: string;
        type: string;
        placeholder?: string;
        value: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        error?: string;
        required?: boolean;
    }> = ({ id, label, type, placeholder, value, onChange, error, required }) => (
        <div className="mb-2">
            <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
                {label}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
            {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
        </div>
    );

    const [bio, setBio] = useState("");
    const [firstname, setFirstname] = useState(form.first_name);
    const [lastname, setLastname] = useState(form.last_name);
    const [email, setEmail] = useState(form.email);
    const [role, setRole] = useState(form.role);
    const [createdAt, setCreatedAt] = useState(form.created_at.slice(0, 16));    
    const [lastLoginAt, setLastLoginAt] = useState(form.last_login_at || "");
    const [isActive, setIsActive] = useState(form.is_active);
    const [isEmailConfirmed, setIsEmailConfirmed] = useState(form.is_email_confirmed);


    if (loading) {
        return (
            <div className="container mx-auto p-4 text-center text-gray-600">
                <h1 className="text-2xl font-bold mb-2">Sign Up</h1>
                <p>Loading form...</p>
            </div>
        );
    }

    if (fetchError) {
        return (
            <div className="container mx-auto p-4 text-center text-red-600">
                <h1 className="text-2xl font-bold mb-2">Error</h1>
                <p>{fetchError}</p>
                <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
            </div>
        );
    }

    return (
       <div className="container mx-auto w-full max-w">
  <h1 className="text-2xl font-bold pt-4 text-gray-800 text-center">Sign Up</h1>
  <form onSubmit={handleSubmit} className="bg-white  rounded-lg">
    <div className="grid grid-cols-1 md:grid-cols-1 gap-2 mb-2">
      <Input
        id="username"
        label="Username"
        type="text"
        placeholder="alice123"
        value={form.username}
        onChange={handleChange}
        error={formErrors.username}
        required
      />

      <Input
        id="email"
        label="Email Address"
        type="email"
        placeholder="alice.smith@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          handleChange({ ...e, target: { ...e.target, name: "email" } } as any);
        }}
        error={formErrors.email}
        required
      />

      <Input
        id="password_hash"
        label="Password"
        type="password"
        placeholder="Enter password"
        value={form.password_hash}
        onChange={handleChange}
        error={formErrors.password_hash}
        required
      />

      <Input
        id="first_name"
        label="First Name"
        type="text"
        placeholder="Alice"
        value={firstname}
        onChange={(e) => {
          setFirstname(e.target.value);
          handleChange({ ...e, target: { ...e.target, name: "first_name" } } as any);
        }}
        error={formErrors.first_name}
        required
      />

      <Input
        id="last_name"
        label="Last Name"
        type="text"
        placeholder="Smith"
        value={lastname}
        onChange={(e) => {
          setLastname(e.target.value);
          handleChange({ ...e, target: { ...e.target, name: "last_name" } } as any);
        }}
        error={formErrors.last_name}
        required
      />
    </div>

    <div className="mb-2">
      <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
        Role
      </label>
      <select
        id="role"
        name="role"
        value={form.role}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-300"
      >
        <option value="admin">Admin</option>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
    </div>

    <div className="mb-2 flex gap-4">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="is_active"
          checked={form.is_active}
          onChange={handleChange}
          className="form-checkbox"
        />
        <span className="text-gray-700 text-sm">Is Active</span>
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="is_email_confirmed"
          checked={form.is_email_confirmed}
          onChange={handleChange}
          className="form-checkbox"
        />
        <span className="text-gray-700 text-sm">Is Email Confirmed</span>
      </label>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
      <Input
        id="created_at"
        label="Created At"
        type="datetime-local"
        value={form.created_at.slice(0, 16)}
        onChange={handleChange}
        error={formErrors.created_at}
        required
      />
    </div>

    <div className="flex justify-end gap-4 mt-8">
      <Button
        type="button"
        variant="secondary"
        onClick={() => router.back()}
      >
        Cancel
      </Button>
      <Button type="submit" variant="primary">
        Sign Up
      </Button>
    </div>
  </form>
</div>
    );
};

export default SignupForm;