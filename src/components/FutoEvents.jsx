import { useEffect, useState } from "react";

function FutoEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://stub.muindetuva.com/api/student', {
        headers: {
          'Authorization': '30|Ubqi3ApU9kXIonEamrKEIlieMFz5Tifgq52xDViFf2953983'
        }
      })
      .then((res) => {
      if (!res.ok) {
        throw new Error("Network response not ok");
      }
      return res.json();
    })
    .then((data) => {
      console.log("Fetched data:", data);
      setEvents(Array.isArray(data) ? data : []);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      setLoading(false);
    });
}, []);

  const groupByMonth = (eventsArray) => {
    return eventsArray.reduce((acc, event) => {
      const month = new Date(event.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!acc[month]) acc[month] = [];
      acc[month].push(event);
      return acc;
    }, {});
  };

  const groupedEvents = groupByMonth(events);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-4xl font-bold text-green-800 mb-6 text-center">
        FUTO Events Calendar
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading events...</p>
      ) : (
        Object.entries(groupedEvents).map(([month, monthEvents]) => (
          <div key={month} className="mb-8">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">{month}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {monthEvents.map((event) => (
                <div
                  key={event.id}
                  className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition"
                >
                  <h4 className="font-bold text-lg text-green-800">{event.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{event.date} — {event.location}</p>
                  <p className="mt-2 text-gray-700">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FutoEvents;