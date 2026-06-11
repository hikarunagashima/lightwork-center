import { permanentRedirect } from "next/navigation";

export default function SessionsRedirectPage() {
  permanentRedirect("/medicine-wheel");
}
