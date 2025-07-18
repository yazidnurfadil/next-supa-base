/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
export type Json =
  | { [key: string]: undefined | Json }
  | boolean
  | string
  | number
  | Json[]
  | null;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | { schema: keyof DatabaseWithoutInternals }
    | keyof DefaultSchema["Enums"],
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | { schema: keyof DatabaseWithoutInternals }
    | keyof DefaultSchema["CompositeTypes"],
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | { schema: keyof DatabaseWithoutInternals }
    | keyof DefaultSchema["Tables"],
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | { schema: keyof DatabaseWithoutInternals }
    | keyof DefaultSchema["Tables"],
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Views"] & DefaultSchema["Tables"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Views"] &
        DefaultSchema["Tables"])
    ? (DefaultSchema["Views"] &
        DefaultSchema["Tables"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type Database = {
  business: {
    Views: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    Tables: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  graphql_public: {
    Views: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    Tables: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Returns: Json;
        Args: {
          query?: string;
          variables?: Json;
          extensions?: Json;
          operationName?: string;
        };
      };
    };
  };
  public: {
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
    Views: {
      business_accounts: {
        Relationships: [];
        Row: {
          id: string | null;
          name: string | null;
          slug: string | null;
          metadata: Json | null;
          is_owner: boolean | null;
          created_at: string | null;
          updated_at: string | null;
          personal_account: boolean | null;
        };
      };
    };
    Tables: {
      users: {
        Relationships: [];
        Row: {
          id: string;
          name: string | null;
          email: string | null;
          image: string | null;
        };
        Insert: {
          id: string;
          name?: string | null;
          email?: string | null;
          image?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
          email?: string | null;
          image?: string | null;
        };
      };
    };
    Functions: {
      get_account_id: {
        Returns: string;
        Args: { slug: string };
      };
      get_account: {
        Returns: Json;
        Args: { account_id: string };
      };
      get_account_by_slug: {
        Returns: Json;
        Args: { slug: string };
      };
      get_accounts: {
        Returns: Json;
        Args: Record<PropertyKey, never>;
      };
      create_account: {
        Returns: Json;
        Args: { slug?: string; name?: string };
      };
      get_personal_account: {
        Returns: Json;
        Args: Record<PropertyKey, never>;
      };
      current_user_account_role: {
        Returns: Json;
        Args: { account_id: string };
      };
      delete_invitation: {
        Returns: undefined;
        Args: { invitation_id: string };
      };
      get_account_billing_status: {
        Returns: Json;
        Args: { account_id: string };
      };
      accept_invitation: {
        Returns: Json;
        Args: { lookup_invitation_token: string };
      };
      lookup_invitation: {
        Returns: Json;
        Args: { lookup_invitation_token: string };
      };
      remove_account_member: {
        Returns: undefined;
        Args: { user_id: string; account_id: string };
      };
      service_role_upsert_customer_subscription: {
        Returns: undefined;
        Args: { customer?: Json; account_id: string; subscription?: Json };
      };
      get_account_members: {
        Returns: Json;
        Args: {
          account_id: string;
          results_limit?: number;
          results_offset?: number;
        };
      };
      get_account_invitations: {
        Returns: Json;
        Args: {
          account_id: string;
          results_limit?: number;
          results_offset?: number;
        };
      };
      update_account: {
        Returns: Json;
        Args: {
          slug?: string;
          name?: string;
          account_id: string;
          public_metadata?: Json;
          replace_metadata?: boolean;
        };
      };
      create_invitation: {
        Returns: Json;
        Args: {
          account_id: string;
          account_role: Database["basejump"]["Enums"]["account_role"];
          invitation_type: Database["basejump"]["Enums"]["invitation_type"];
        };
      };
      update_account_user_role: {
        Returns: undefined;
        Args: {
          user_id: string;
          account_id: string;
          make_primary_owner?: boolean;
          new_account_role: Database["basejump"]["Enums"]["account_role"];
        };
      };
    };
  };
  next_auth: {
    Views: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
    Functions: {
      uid: {
        Returns: string;
        Args: Record<PropertyKey, never>;
      };
    };
    Tables: {
      verification_tokens: {
        Relationships: [];
        Row: {
          token: string;
          expires: string;
          identifier: string | null;
        };
        Insert: {
          token: string;
          expires: string;
          identifier?: string | null;
        };
        Update: {
          token?: string;
          expires?: string;
          identifier?: string | null;
        };
      };
      users: {
        Relationships: [];
        Row: {
          id: string;
          name: string | null;
          email: string | null;
          image: string | null;
          emailVerified: string | null;
        };
        Insert: {
          id?: string;
          name?: string | null;
          email?: string | null;
          image?: string | null;
          emailVerified?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
          email?: string | null;
          image?: string | null;
          emailVerified?: string | null;
        };
      };
      sessions: {
        Row: {
          id: string;
          expires: string;
          sessionToken: string;
          userId: string | null;
        };
        Insert: {
          id?: string;
          expires: string;
          sessionToken: string;
          userId?: string | null;
        };
        Update: {
          id?: string;
          expires?: string;
          sessionToken?: string;
          userId?: string | null;
        };
        Relationships: [
          {
            isOneToOne: false;
            columns: ["userId"];
            referencedColumns: ["id"];
            referencedRelation: "users";
            foreignKeyName: "sessions_userId_fkey";
          },
        ];
      };
      accounts: {
        Relationships: [
          {
            isOneToOne: false;
            columns: ["userId"];
            referencedColumns: ["id"];
            referencedRelation: "users";
            foreignKeyName: "accounts_userId_fkey";
          },
        ];
        Row: {
          id: string;
          type: string;
          provider: string;
          scope: string | null;
          userId: string | null;
          id_token: string | null;
          expires_at: number | null;
          providerAccountId: string;
          token_type: string | null;
          oauth_token: string | null;
          access_token: string | null;
          refresh_token: string | null;
          session_state: string | null;
          oauth_token_secret: string | null;
        };
        Insert: {
          id?: string;
          type: string;
          provider: string;
          scope?: string | null;
          userId?: string | null;
          id_token?: string | null;
          providerAccountId: string;
          expires_at?: number | null;
          token_type?: string | null;
          oauth_token?: string | null;
          access_token?: string | null;
          refresh_token?: string | null;
          session_state?: string | null;
          oauth_token_secret?: string | null;
        };
        Update: {
          id?: string;
          type?: string;
          provider?: string;
          scope?: string | null;
          userId?: string | null;
          id_token?: string | null;
          expires_at?: number | null;
          providerAccountId?: string;
          token_type?: string | null;
          oauth_token?: string | null;
          access_token?: string | null;
          refresh_token?: string | null;
          session_state?: string | null;
          oauth_token_secret?: string | null;
        };
      };
    };
  };
  basejump: {
    Views: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
    Enums: {
      invitation_type: "one_time" | "24_hour";
      account_role: "member" | "super" | "owner";
      subscription_status:
        | "incomplete_expired"
        | "incomplete"
        | "trialing"
        | "canceled"
        | "past_due"
        | "active"
        | "unpaid";
    };
    Functions: {
      is_set: {
        Returns: boolean;
        Args: { field_name: string };
      };
      generate_token: {
        Returns: string;
        Args: { length: number };
      };
      get_config: {
        Returns: Json;
        Args: Record<PropertyKey, never>;
      };
      is_super_user: {
        Returns: boolean;
        Args: { account_id: string };
      };
      get_accounts_with_role: {
        Returns: string[];
        Args: {
          passed_in_role?: Database["basejump"]["Enums"]["account_role"];
        };
      };
      has_role_on_account: {
        Returns: boolean;
        Args: {
          account_id: string;
          account_role?: Database["basejump"]["Enums"]["account_role"];
        };
      };
    };
    Tables: {
      config: {
        Relationships: [];
        Row: {
          billing_provider: string | null;
          enable_team_accounts: boolean | null;
          enable_team_account_billing: boolean | null;
          enable_personal_account_billing: boolean | null;
        };
        Insert: {
          billing_provider?: string | null;
          enable_team_accounts?: boolean | null;
          enable_team_account_billing?: boolean | null;
          enable_personal_account_billing?: boolean | null;
        };
        Update: {
          billing_provider?: string | null;
          enable_team_accounts?: boolean | null;
          enable_team_account_billing?: boolean | null;
          enable_personal_account_billing?: boolean | null;
        };
      };
      account_user: {
        Row: {
          user_id: string;
          account_id: string;
          account_role: Database["basejump"]["Enums"]["account_role"];
        };
        Insert: {
          user_id: string;
          account_id: string;
          account_role: Database["basejump"]["Enums"]["account_role"];
        };
        Update: {
          user_id?: string;
          account_id?: string;
          account_role?: Database["basejump"]["Enums"]["account_role"];
        };
        Relationships: [
          {
            isOneToOne: false;
            columns: ["account_id"];
            referencedColumns: ["id"];
            referencedRelation: "accounts";
            foreignKeyName: "account_user_account_id_fkey";
          },
        ];
      };
      billing_customers: {
        Row: {
          id: string;
          account_id: string;
          email: string | null;
          active: boolean | null;
          provider: string | null;
        };
        Insert: {
          id: string;
          account_id: string;
          email?: string | null;
          active?: boolean | null;
          provider?: string | null;
        };
        Update: {
          id?: string;
          account_id?: string;
          email?: string | null;
          active?: boolean | null;
          provider?: string | null;
        };
        Relationships: [
          {
            isOneToOne: false;
            columns: ["account_id"];
            referencedColumns: ["id"];
            referencedRelation: "accounts";
            foreignKeyName: "billing_customers_account_id_fkey";
          },
        ];
      };
      accounts: {
        Relationships: [];
        Row: {
          id: string;
          name: string | null;
          slug: string | null;
          created_at: string | null;
          created_by: string | null;
          personal_account: boolean;
          updated_at: string | null;
          updated_by: string | null;
          public_metadata: Json | null;
          primary_owner_user_id: string;
          private_metadata: Json | null;
        };
        Insert: {
          id?: string;
          name?: string | null;
          slug?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          personal_account?: boolean;
          updated_at?: string | null;
          updated_by?: string | null;
          public_metadata?: Json | null;
          primary_owner_user_id?: string;
          private_metadata?: Json | null;
        };
        Update: {
          id?: string;
          name?: string | null;
          slug?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          personal_account?: boolean;
          updated_at?: string | null;
          updated_by?: string | null;
          public_metadata?: Json | null;
          primary_owner_user_id?: string;
          private_metadata?: Json | null;
        };
      };
      invitations: {
        Relationships: [
          {
            isOneToOne: false;
            columns: ["account_id"];
            referencedColumns: ["id"];
            referencedRelation: "accounts";
            foreignKeyName: "invitations_account_id_fkey";
          },
        ];
        Row: {
          id: string;
          token: string;
          account_id: string;
          created_at: string | null;
          updated_at: string | null;
          invited_by_user_id: string;
          account_name: string | null;
          account_role: Database["basejump"]["Enums"]["account_role"];
          invitation_type: Database["basejump"]["Enums"]["invitation_type"];
        };
        Insert: {
          id?: string;
          token?: string;
          account_id: string;
          created_at?: string | null;
          invited_by_user_id: string;
          updated_at?: string | null;
          account_name?: string | null;
          account_role: Database["basejump"]["Enums"]["account_role"];
          invitation_type: Database["basejump"]["Enums"]["invitation_type"];
        };
        Update: {
          id?: string;
          token?: string;
          account_id?: string;
          created_at?: string | null;
          updated_at?: string | null;
          invited_by_user_id?: string;
          account_name?: string | null;
          account_role?: Database["basejump"]["Enums"]["account_role"];
          invitation_type?: Database["basejump"]["Enums"]["invitation_type"];
        };
      };
      billing_subscriptions: {
        Relationships: [
          {
            isOneToOne: false;
            columns: ["account_id"];
            referencedColumns: ["id"];
            referencedRelation: "accounts";
            foreignKeyName: "billing_subscriptions_account_id_fkey";
          },
          {
            isOneToOne: false;
            referencedColumns: ["id"];
            columns: ["billing_customer_id"];
            referencedRelation: "billing_customers";
            foreignKeyName: "billing_subscriptions_billing_customer_id_fkey";
          },
        ];
        Row: {
          id: string;
          created: string;
          account_id: string;
          metadata: Json | null;
          ended_at: string | null;
          price_id: string | null;
          provider: string | null;
          quantity: number | null;
          cancel_at: string | null;
          plan_name: string | null;
          trial_end: string | null;
          canceled_at: string | null;
          current_period_end: string;
          trial_start: string | null;
          billing_customer_id: string;
          current_period_start: string;
          cancel_at_period_end: boolean | null;
          status: Database["basejump"]["Enums"]["subscription_status"] | null;
        };
        Insert: {
          id: string;
          created?: string;
          account_id: string;
          metadata?: Json | null;
          ended_at?: string | null;
          price_id?: string | null;
          provider?: string | null;
          quantity?: number | null;
          cancel_at?: string | null;
          plan_name?: string | null;
          trial_end?: string | null;
          billing_customer_id: string;
          canceled_at?: string | null;
          current_period_end?: string;
          trial_start?: string | null;
          current_period_start?: string;
          cancel_at_period_end?: boolean | null;
          status?: Database["basejump"]["Enums"]["subscription_status"] | null;
        };
        Update: {
          id?: string;
          created?: string;
          account_id?: string;
          metadata?: Json | null;
          ended_at?: string | null;
          price_id?: string | null;
          provider?: string | null;
          quantity?: number | null;
          cancel_at?: string | null;
          plan_name?: string | null;
          trial_end?: string | null;
          canceled_at?: string | null;
          current_period_end?: string;
          trial_start?: string | null;
          billing_customer_id?: string;
          current_period_start?: string;
          cancel_at_period_end?: boolean | null;
          status?: Database["basejump"]["Enums"]["subscription_status"] | null;
        };
      };
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export const Constants = {
  public: {
    Enums: {},
  },
  business: {
    Enums: {},
  },
  next_auth: {
    Enums: {},
  },
  graphql_public: {
    Enums: {},
  },
  basejump: {
    Enums: {
      invitation_type: ["one_time", "24_hour"],
      account_role: ["super", "owner", "member"],
      subscription_status: [
        "trialing",
        "active",
        "canceled",
        "incomplete",
        "incomplete_expired",
        "past_due",
        "unpaid",
      ],
    },
  },
} as const;
