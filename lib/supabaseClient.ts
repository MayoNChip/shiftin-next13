import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
	"https://noywjgrwirorerkogrms.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5veXdqZ3J3aXJvcmVya29ncm1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYyOTU0NjgsImV4cCI6MjAwMTg3MTQ2OH0.j-wdFDDK-UcngAPwNVTIImZqaxz2bDqVYYMdLlQ4Sxg"
);
