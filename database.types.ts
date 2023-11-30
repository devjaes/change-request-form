export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      change_request: {
        Row: {
          change_description: string
          change_reason: string
          created_at: string
          id: number
          impact_change: string
          project_name: string
          proposed_action: string
          request_name: string
          requested_by: string | null
        }
        Insert: {
          change_description: string
          change_reason: string
          created_at?: string
          id?: number
          impact_change: string
          project_name: string
          proposed_action: string
          request_name: string
          requested_by?: string | null
        }
        Update: {
          change_description?: string
          change_reason?: string
          created_at?: string
          id?: number
          impact_change?: string
          project_name?: string
          proposed_action?: string
          request_name?: string
          requested_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "change_request_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          }
        ]
      }
      manage_change_request: {
        Row: {
          aproval_date: string | null
          change_request_id: number | null
          created_at: string
          id: number
          manager_id: string | null
          status: Database["public"]["Enums"]["request_status"] | null
        }
        Insert: {
          aproval_date?: string | null
          change_request_id?: number | null
          created_at?: string
          id?: number
          manager_id?: number | null
          status?: Database["public"]["Enums"]["request_status"] | null
        }
        Update: {
          aproval_date?: string | null
          change_request_id?: number | null
          created_at?: string
          id?: number
          manager_id?: number | null
          status?: Database["public"]["Enums"]["request_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "manage_change_request_change_request_id_fkey"
            columns: ["change_request_id"]
            isOneToOne: false
            referencedRelation: "change_request"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "manage_change_request_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string
          id: number
          user_email: string
          user_id: string
          user_last_name: string
          user_name: string
          user_role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          created_at?: string
          id?: number
          user_email: string
          user_id: string
          user_last_name: string
          user_name: string
          user_role: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          created_at?: string
          id?: number
          user_email?: string
          user_id?: string
          user_last_name?: string
          user_name?: string
          user_role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: [
          {
            foreignKeyName: "users_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      request_status: "IN_REVIEW" | "APROVED" | "REJECTED"
      user_role: "MANAGER" | "DEVELOPER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export interface RequestData {
  change_description: string
  change_reason: string
  created_at: string
  id: number
  impact_change: string
  project_name: string
  proposed_action: string
  request_name: string
  requested_by: string | null
}
