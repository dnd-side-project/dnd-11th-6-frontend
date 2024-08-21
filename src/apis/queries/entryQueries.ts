import { useMutation, useQuery } from '@tanstack/react-query'
import { MeetingData } from '@/stores/useMeetingStore'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

interface ApiResponse<T = null> {
  status: number;
  data: T;
}

interface ApiError {
  status: number;
  data: null;
  error: {
    code: string;
    message: string;
  };
}

type CheckNicknameResponse = ApiResponse<{ isAvailableNickname: boolean }>;
type JoinMeetingResponse = ApiResponse<{ participantId: number }>;
type CheckMeetLinkResponse = ApiResponse<MeetingData>;
type ValidatePasswordResponse = ApiResponse;
type ValidateLeaderAuthKeyResponse = ApiResponse;

const apiCall = async <T>(
  endpoint: string,
  method: 'GET' | 'POST' = 'GET',
  body?: object
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const result = await response.json();
  if (!response.ok) throw result;
  return result;
};

export const useCheckNickname = (
  meetingId: number,
  nickname: string,
  options?: UseQueryOptions<CheckNicknameResponse, ApiError>
) =>
  useQuery<CheckNicknameResponse, ApiError>({
    queryKey: ['nickname', meetingId, nickname],
    queryFn: () =>
      apiCall(`/meetings/${meetingId}/participants/check-nickname?nickname=${nickname}`),
    enabled: !!nickname,
    retry: false,
    ...options,
  });

export const useJoinMeeting = (
  options?: UseMutationOptions<
    JoinMeetingResponse,
    ApiError,
    { meetingId: number; nickname: string; role: string }
  >
) =>
  useMutation<JoinMeetingResponse, ApiError, { meetingId: number; nickname: string; role: string }>({
    mutationFn: ({ meetingId, nickname, role }) =>
      apiCall(`/meetings/${meetingId}/participants`, 'POST', { nickname, role }),
    ...options,
  });

export const useCheckMeetingLink = (
  link: string,
  options?: UseQueryOptions<CheckMeetLinkResponse, ApiError>
) =>
  useQuery<CheckMeetLinkResponse, ApiError>({
    queryKey: ['meeting', link],
    queryFn: () => apiCall(`/meetings?meetingLink=${link}`),
    enabled: !!link,
    retry: false,
    ...options,
  });

export const useValidatePassword = (
  options?: UseMutationOptions<
    ValidatePasswordResponse,
    ApiError,
    { meetingId: number; password: string }
  >
) =>
  useMutation<ValidatePasswordResponse, ApiError, { meetingId: number; password: string }>({
    mutationFn: ({ meetingId, password }) => {
      if (!password || password.length < 6) return null;
      return apiCall(`/meetings/${meetingId}/validate-password`, 'POST', { password });
    },
    ...options,
  });

export const useValidateLeaderAuthKey = (
  options?: UseMutationOptions<
    ValidateLeaderAuthKeyResponse,
    ApiError,
    { meetingId: number; leaderAuthKey: string }
  >
) =>
  useMutation<
    ValidateLeaderAuthKeyResponse,
    ApiError,
    { meetingId: number; leaderAuthKey: string }
  >({
    mutationFn: ({ meetingId, leaderAuthKey }) => {
      if (!leaderAuthKey || leaderAuthKey.length !== 4) return null;
      return apiCall(`/meetings/${meetingId}/validate-leader-key`, 'POST', { leaderAuthKey });
    },
    ...options,
  });
