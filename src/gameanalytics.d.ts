declare module "gameanalytics" {
  enum EGAErrorSeverity {
    Undefined = 0,
    Debug = 1,
    Info = 2,
    Warning = 3,
    Error = 4,
    Critical = 5,
  }
  enum EGAProgressionStatus {
    Undefined = 0,
    Start = 1,
    Complete = 2,
    Fail = 3,
  }
  enum EGAResourceFlowType {
    Undefined = 0,
    Source = 1,
    Sink = 2,
  }
  enum EGAAdAction {
    Undefined = 0,
    Clicked = 1,
    Show = 2,
    FailedShow = 3,
    RewardReceived = 4,
  }
  enum EGAAdError {
    Undefined = 0,
    Unknown = 1,
    Offline = 2,
    NoFill = 3,
    InternalError = 4,
    InvalidRequest = 5,
    UnableToPrecache = 6,
  }
  enum EGAAdType {
    Undefined = 0,
    Video = 1,
    RewardedVideo = 2,
    Playable = 3,
    Interstitial = 4,
    OfferWall = 5,
    Banner = 6,
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type CustomFields = Record<string, any>;

  type GameAnalyticsInstance = {
    initTimedBlockId: number;
    getGlobalObject(): globalThis;
    init(): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gaCommand(...args: any[]): void;
    configureAvailableCustomDimensions01(customDimensions?: string[]): void;
    configureAvailableCustomDimensions02(customDimensions?: string[]): void;
    configureAvailableCustomDimensions03(customDimensions?: string[]): void;
    configureAvailableResourceCurrencies(resourceCurrencies?: string[]): void;
    configureAvailableResourceItemTypes(resourceItemTypes?: string[]): void;
    configureBuild(build?: string): void;
    configureSdkGameEngineVersion(sdkGameEngineVersion?: string): void;
    configureGameEngineVersion(gameEngineVersion?: string): void;
    configureUserId(uId?: string): void;
    initialize(gameKey?: string, gameSecret?: string): void;
    addBusinessEvent(
      currency?: string,
      amount?: number,
      itemType?: string,
      itemId?: string,
      cartType?: string,
      customFields?: CustomFields,
      mergeFields?: boolean,
    ): void;
    addResourceEvent(
      flowType?: EGAResourceFlowType,
      currency?: string,
      amount?: number,
      itemType?: string,
      itemId?: string,
      customFields?: CustomFields,
      mergeFields?: boolean,
    ): void;
    addProgressionEvent(
      progressionStatus?: EGAProgressionStatus,
      progression01?: string,
      progression02?: string,
      progression03?: string,
      score?: number,
      customFields?: CustomFields,
      mergeFields?: boolean,
    ): void;
    addDesignEvent(
      eventId: string,
      value?: number,
      customFields?: CustomFields,
      mergeFields?: boolean,
    ): void;
    addErrorEvent(
      severity?: EGAErrorSeverity,
      message?: string,
      customFields?: CustomFields,
      mergeFields?: boolean,
    ): void;
    addAdEventWithNoAdReason(
      adAction?: EGAAdAction,
      adType?: EGAAdType,
      adSdkName?: string,
      adPlacement?: string,
      noAdReason?: EGAAdError,
      customFields?: CustomFields,
      mergeFields?: boolean,
    ): void;
    addAdEventWithDuration(
      adAction?: EGAAdAction,
      adType?: EGAAdType,
      adSdkName?: string,
      adPlacement?: string,
      duration?: number,
      customFields?: CustomFields,
      mergeFields?: boolean,
    ): void;
    addAdEvent(
      adAction?: EGAAdAction,
      adType?: EGAAdType,
      adSdkName?: string,
      adPlacement?: string,
      customFields?: CustomFields,
      mergeFields?: boolean,
    ): void;
    setEnabledInfoLog(flag?: boolean): void;
    setEnabledVerboseLog(flag?: boolean): void;
    setEnabledManualSessionHandling(flag?: boolean): void;
    setEnabledEventSubmission(flag?: boolean): void;
    setCustomDimension01(dimension?: string): void;
    setCustomDimension02(dimension?: string): void;
    setCustomDimension03(dimension?: string): void;
    setGlobalCustomEventFields(customFields?: CustomFields): void;
    setEventProcessInterval(intervalInSeconds: number): void;
    startSession(): void;
    endSession(): void;
    onStop(): void;
    onResume(): void;
    getRemoteConfigsValueAsString(key: string, defaultValue?: string): string;
    isRemoteConfigsReady(): boolean;
    addRemoteConfigsListener(listener: {
      onRemoteConfigsUpdated: () => void;
    }): void;
    removeRemoteConfigsListener(listener: {
      onRemoteConfigsUpdated: () => void;
    }): void;
    getRemoteConfigsContentAsString(): string;
    getABTestingId(): string;
    getABTestingVariantId(): string;
    addOnBeforeUnloadListener(listener: { onBeforeUnload: () => void }): void;
    removeOnBeforeUnloadListener(listener: {
      onBeforeUnload: () => void;
    }): void;
    internalInitialize(): void;
    newSession(): void;
    startNewSessionCallback(): void;
    resumeSessionAndStartQueue(initResponse, initResponseDict): void;
    isSdkReady(): boolean;
  };

  export const GameAnalytics: GameAnalyticsInstance;
}
