type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorResponse = ActionResponse<T> & { success: false };

type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;

interface RouteParams {
  params: Promise<Recode<string, string>>;
  searchParams: Promise<Recode<string, string>>;
}

interface ParkingSession {
  slot: {
    slotId: string;
    location: string;
    deviceId: string;
  };
  checkInTime: Date;
  locked: boolean;
  paymentStatus: "unpaid" | "paid";
}

interface WeatherEntry {
  timestamp: string;
  temperature: number;
  humidity: number;
  rain: boolean;
}

interface HistoryEntry {
  slotId: string;
  checkInTime: Date;
  checkOutTime: Date;
  fee: number;
  paymentStatus: "unpaid" | "paid";
}
