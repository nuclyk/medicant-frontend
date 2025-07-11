import { config } from "$lib/config";
import toast from "svelte-5-french-toast";
import { error } from "@sveltejs/kit";
import dayjs from "dayjs";

export const handleDelete = async (id, obj, token) => {
  try {
    const res = await fetch(config.apiUrl + obj + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!res.ok) {
      error(res.status, "Could not delete!");
    }

    toast.success("Deleted successfuly!");
  } catch (err) {
    toast.error(err.message);
  }
};

export async function handleChange(id, obj, event, token) {
  let value = event.target.value;
  if (Number(value)) {
    value = Number(value);
  }

  try {
    const res = await fetch(config.apiUrl + obj + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        [event.target.name]: value,
      }),
    });

    if (!res.ok) {
      error(res.status, "Could not update!");
    }

    toast.success("Updated successfuly!");
  } catch (err) {
    toast.error(err.message);
  }
}

export async function handleCheckout(id, token) {
  try {
    const res = await fetch(config.apiUrl + "users/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        check_out_date: dayjs().toISOString(),
        is_checked_in: false,
        place: 1,
        room_id: 0,
      }),
    });

    if (!res.ok) {
      error(res.status, "Could not checkout the user!");
    }

    toast.success("Participant successfuly checked out!");
  } catch (err) {
    toast.error(err.status + " : " + err.message);
  }
}
