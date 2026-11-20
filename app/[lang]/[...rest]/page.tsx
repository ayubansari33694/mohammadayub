import { notFound } from "next/navigation";

// Any unknown address inside a language falls through to that language's 404 page.
export default function CatchAll() {
  notFound();
}
